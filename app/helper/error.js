/// <reference path="../../typings/index.d.ts" />
"use strict";
let err = {
    json400: null,
    json404: null,
    json500: null
};
exports.err = err;
// 400 Bad Request
err.json400 = function (err, res) {
    res.status(400);
    res.json({
        err: err.message,
        msg: 'bad request, params is not satisfied'
    });
};
// 404 Not Found
err.json404 = function (err, res) {
    res.status(404);
    res.json({
        err: err.message,
        msg: 'Not Found'
    });
};
// 500 Internal Server Error
err.json500 = function (err, res) {
    console.log(err);
    res.status(500);
    res.json({
        err: err.message,
        msg: 'something bad happen'
    });
};
