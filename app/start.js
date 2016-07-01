/// <reference path="../typings/index.d.ts" />
"use strict";
const api_1 = require('./api');
const connect_1 = require('./dbmodel/connect');
api_1.server.listen(8080, function () {
    console.log(`${api_1.server.name} is listening at ${api_1.server.url}`);
    if (connect_1.db) {
        console.log('db is ok');
    }
    else {
        console.log('db is bad');
    }
});
