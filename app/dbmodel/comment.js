/// <reference path="../../typings/index.d.ts" />
"use strict";
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let options = {
    timestamps: true
};
let commentSchema = new Schema({
    body: {
        type: String,
        trim: true
    }
}, options);
let Comment = mongoose.model('Comment', commentSchema, 'comment');
exports.Comment = Comment;
