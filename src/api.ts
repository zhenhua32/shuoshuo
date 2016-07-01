/// <reference path="../typings/index.d.ts" />

import {server} from './config';
import {Img, IImg} from './dbmodel/img';
import {Comment, IComment} from './dbmodel/comment';
import {List, IList} from './dbmodel/list';
import {Link, ILink} from './dbmodel/link';
import {err as errhelper} from './helper/error';
import {Helper} from './helper/helper';

// for CORS
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");

  return next();
})

server.get('/img/count', function (req, res, next) {
  Img.count({}, function (err, count) {
    res.json({
      number: count
    })
  })
});

/**
 * put for /img
 * @form name=title&&name=body
 */
server.put('/img', function (req, res, next) {
  let params = {
    title: req.params.title,
    body: req.params.body,
    type: req.params.type
  }
  if (!Helper.imgExist(params, res)) return next();

  let img = new Img(params);
  // ts fix using IImg
  img.save(function (err, document: IImg) {
    if (err) {
      errhelper.json500(err, res);
    } else {
      // save in listSchema
      let list = new List({
        body: 'http://127.0.0.1:8080/img/' + document._id,
        type: 'photo'
      });
      list.save(function (err, listresult: IList) {
        if (err) errhelper.json500(err, res);
        else res.json({
          msg: 'ok',
          id: document._id
        });
      })
    };

  })
  return next();
});

server.get('/img/:id', function (req, res, next) {
  Img.findById(req.params.id, function (err, document) {
    if (err) {
      errhelper.json500(err, res);
    } else {
      if (!document) {
        errhelper.json404(new Error('no such document'), res);
      } else {
        res.setHeader('content-type', Helper.getMIME(document.type));
        res.end(document.body);
      }
    }
  });
  return next();
});
// 没有精细化, 一旦更新, title和body和type都要有
server.post('/img/:id', function (req, res, next) {
  let params = {
    title: req.params.title,
    body: req.params.body,
    type: req.params.type
  }
  if (!Helper.imgExist(params, res)) return next();

  Img.findById(req.params.id, function (err, document) {
    if (err) {
      errhelper.json500(err, res);
    } else {
      if (!document) {
        errhelper.json404(new Error('no such document'), res);
      } else {
        document.update({ $set: params }, { w: 1 },
          function (err, affectRows, raw) {
            if (err) errhelper.json500(err, res);
            else res.json({
              msg: 'ok'
            })
          })
      }
    }
  });
  return next();
});

server.del('/img/:id', function (req, res, next) {
  Img.findOne({ '_id': req.params.id }, function (err, document) {
    if (err) {
      errhelper.json500(err, res);
    } else {
      if (!document) {
        errhelper.json404(new Error('no such document'), res);
      } else {
        document.remove(function (err) {
          if (err) errhelper.json500(err, res);
          else res.json({
            msg: 'ok'
          })
        })
      }
    }
  });
  return next();
});
// @form name=comment
server.put('/comment', function (req, res, next) {
  let params = {
    body: req.params.body
  }
  if (!Helper.commentExist(params, res)) return next();

  let comment = new Comment(params);
  comment.save(function (err, document: IComment) {
    if (err) errhelper.json500(err, res);
    else {
      let list = new List({
        body: params.body,
        type: 'comment'
      })
      list.save(function (err, listresult: IList) {
        if (err) errhelper.json500(err, res);
        else res.json({
          msg: 'ok',
          id: document._id,
          body: document.body
        })
      });
    }
  });
  return next();
});

server.get('/comment/:id', function (req, res, next) {
  Comment.findById(req.params.id, function (err, document) {
    if (err) errhelper.json500(err, res);
    else {
      if (!document) errhelper.json404(new Error('no such document'), res);
      else res.json({
        body: document.body
      });
    }
  });
  return next();
});
// @form name=body&name=type
server.put('/list', function (req, res, next) {
  let params = {
    body: req.params.body,
    type: req.params.type
  }
  if (!Helper.listExist(params, res)) return next();

  let list = new List(params);
  list.save(function (err, document: IList) {
    if (err) errhelper.json500(err, res);
    else res.json({
      msg: 'ok',
      id: document._id
    })
  })
});

server.get('/list/find', function (req, res, next) {
  let limit = 10;
  let skip = 0;
  let sortby = '-createdAt';
  let q: any = req.query;
  if (q.limit && parseInt(q.limit)) limit = parseInt(q.limit);
  if (q.skip && parseInt(q.limit)) skip = parseInt(q.skip);

  List.find({})
    .sort(sortby)
    .skip(skip)
    .limit(limit)
    .exec(function (err, documents) {
      if (err) errhelper.json500(err, res);
      else res.json({
        msg: 'ok',
        lists: documents
      })
    });
  return next();
});

server.put('/link', function (req, res, next) {
  let params = {
    body: req.params.body
  }
  if (!Helper.linkExist(params, res)) return next();

  let link = new Link(params);
  link.save(function (err, document: ILink) {
    if (err) errhelper.json500(err, res);
    else {
      let list = new List({
        body: params.body,
        type: 'link'
      });
      list.save(function(err, listresult:IList){
        if(err) errhelper.json500(err, res);
        else res.json({
          msg: 'ok',
          id: document._id
        })
      })
    }
  });
  return next();
});

export {server};