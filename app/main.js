/// <reference path="../typings/index.d.ts" />
"use strict";
const restify = require('restify');
const connect_1 = require('./dbmodel/connect');
const img_1 = require('./dbmodel/img');
let server = restify.createServer({
    name: 'img-server',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({
    maxBodySize: 0,
    mapParams: true,
    mapFiles: true,
    overrideParams: true,
    keepExtensions: true,
    multiples: true,
    hash: 'sha1'
}));
server.use(restify.gzipResponse());
server.use(restify.throttle({
    burst: 100,
    rate: 50,
    ip: true,
    overrides: {
        '192.168.1.1': {
            rate: 0,
            burst: 0
        },
        "127.0.0.1": {
            rate: 0,
            burst: 0
        },
        "localhost": {
            rate: 0,
            burst: 0
        }
    }
}));
server.get('/hello', function (req, res, next) {
    res.send('hello');
    return next();
});
server.post('/img', function (req, res, next) {
    let img = new img_1.Img({
        title: req.params.title,
        body: req.params.img
    });
    img.save(function (err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({
                err: err,
                msg: 'something bad happen'
            });
        }
        else {
            console.log('ok');
            res.json({
                msg: 'ok'
            });
        }
    });
    return next();
});
server.listen(8080, function () {
    console.log(`${server.name} is listening at ${server.url}`);
    if (connect_1.db) {
        console.log('db is ok');
    }
    else {
        console.log('db is bad');
    }
});
