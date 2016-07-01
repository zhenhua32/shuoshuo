/// <reference path="../typings/index.d.ts" />
"use strict";
const config_1 = require('./config');
exports.server = config_1.server;
const img_1 = require('./dbmodel/img');
const comment_1 = require('./dbmodel/comment');
const list_1 = require('./dbmodel/list');
const link_1 = require('./dbmodel/link');
const error_1 = require('./helper/error');
const helper_1 = require('./helper/helper');
// for CORS
config_1.server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});
config_1.server.get('/img/count', function (req, res, next) {
    img_1.Img.count({}, function (err, count) {
        res.json({
            number: count
        });
    });
});
/**
 * put for /img
 * @form name=title&&name=body
 */
config_1.server.put('/img', function (req, res, next) {
    let params = {
        title: req.params.title,
        body: req.params.body,
        type: req.params.type
    };
    if (!helper_1.Helper.imgExist(params, res))
        return next();
    let img = new img_1.Img(params);
    // ts fix using IImg
    img.save(function (err, document) {
        if (err) {
            error_1.err.json500(err, res);
        }
        else {
            // save in listSchema
            let list = new list_1.List({
                body: 'http://127.0.0.1:8080/img/' + document._id,
                type: 'photo'
            });
            list.save(function (err, listresult) {
                if (err)
                    error_1.err.json500(err, res);
                else
                    res.json({
                        msg: 'ok',
                        id: document._id
                    });
            });
        }
        ;
    });
    return next();
});
config_1.server.get('/img/:id', function (req, res, next) {
    img_1.Img.findById(req.params.id, function (err, document) {
        if (err) {
            error_1.err.json500(err, res);
        }
        else {
            if (!document) {
                error_1.err.json404(new Error('no such document'), res);
            }
            else {
                res.setHeader('content-type', helper_1.Helper.getMIME(document.type));
                res.end(document.body);
            }
        }
    });
    return next();
});
// 没有精细化, 一旦更新, title和body和type都要有
config_1.server.post('/img/:id', function (req, res, next) {
    let params = {
        title: req.params.title,
        body: req.params.body,
        type: req.params.type
    };
    if (!helper_1.Helper.imgExist(params, res))
        return next();
    img_1.Img.findById(req.params.id, function (err, document) {
        if (err) {
            error_1.err.json500(err, res);
        }
        else {
            if (!document) {
                error_1.err.json404(new Error('no such document'), res);
            }
            else {
                document.update({ $set: params }, { w: 1 }, function (err, affectRows, raw) {
                    if (err)
                        error_1.err.json500(err, res);
                    else
                        res.json({
                            msg: 'ok'
                        });
                });
            }
        }
    });
    return next();
});
config_1.server.del('/img/:id', function (req, res, next) {
    img_1.Img.findOne({ '_id': req.params.id }, function (err, document) {
        if (err) {
            error_1.err.json500(err, res);
        }
        else {
            if (!document) {
                error_1.err.json404(new Error('no such document'), res);
            }
            else {
                document.remove(function (err) {
                    if (err)
                        error_1.err.json500(err, res);
                    else
                        res.json({
                            msg: 'ok'
                        });
                });
            }
        }
    });
    return next();
});
// @form name=comment
config_1.server.put('/comment', function (req, res, next) {
    let params = {
        body: req.params.body
    };
    if (!helper_1.Helper.commentExist(params, res))
        return next();
    let comment = new comment_1.Comment(params);
    comment.save(function (err, document) {
        if (err)
            error_1.err.json500(err, res);
        else {
            let list = new list_1.List({
                body: params.body,
                type: 'comment'
            });
            list.save(function (err, listresult) {
                if (err)
                    error_1.err.json500(err, res);
                else
                    res.json({
                        msg: 'ok',
                        id: document._id,
                        body: document.body
                    });
            });
        }
    });
    return next();
});
config_1.server.get('/comment/:id', function (req, res, next) {
    comment_1.Comment.findById(req.params.id, function (err, document) {
        if (err)
            error_1.err.json500(err, res);
        else {
            if (!document)
                error_1.err.json404(new Error('no such document'), res);
            else
                res.json({
                    body: document.body
                });
        }
    });
    return next();
});
// @form name=body&name=type
config_1.server.put('/list', function (req, res, next) {
    let params = {
        body: req.params.body,
        type: req.params.type
    };
    if (!helper_1.Helper.listExist(params, res))
        return next();
    let list = new list_1.List(params);
    list.save(function (err, document) {
        if (err)
            error_1.err.json500(err, res);
        else
            res.json({
                msg: 'ok',
                id: document._id
            });
    });
});
config_1.server.get('/list/find', function (req, res, next) {
    let limit = 10;
    let skip = 0;
    let sortby = '-createdAt';
    let q = req.query;
    if (q.limit && parseInt(q.limit))
        limit = parseInt(q.limit);
    if (q.skip && parseInt(q.limit))
        skip = parseInt(q.skip);
    list_1.List.find({})
        .sort(sortby)
        .skip(skip)
        .limit(limit)
        .exec(function (err, documents) {
        if (err)
            error_1.err.json500(err, res);
        else
            res.json({
                msg: 'ok',
                lists: documents
            });
    });
    return next();
});
config_1.server.put('/link', function (req, res, next) {
    let params = {
        body: req.params.body
    };
    if (!helper_1.Helper.linkExist(params, res))
        return next();
    let link = new link_1.Link(params);
    link.save(function (err, document) {
        if (err)
            error_1.err.json500(err, res);
        else {
            let list = new list_1.List({
                body: params.body,
                type: 'link'
            });
            list.save(function (err, listresult) {
                if (err)
                    error_1.err.json500(err, res);
                else
                    res.json({
                        msg: 'ok',
                        id: document._id
                    });
            });
        }
    });
    return next();
});
