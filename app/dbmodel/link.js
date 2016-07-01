/// <reference path="../../typings/index.d.ts" />
"use strict";
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let options = {
    timestamps: true
};
let linkSchema = new Schema({
    body: {
        type: String,
        trim: true,
        match: /https?:\/\/.+/
    }
}, options);
let Link = mongoose.model('Link', linkSchema, 'link');
exports.Link = Link;
