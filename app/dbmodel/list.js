/// <reference path="../../typings/index.d.ts" />
"use strict";
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let options = {
    timestamps: true
};
let listSchema = new Schema({
    body: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        default: 'comment'
    }
}, options);
let List = mongoose.model('List', listSchema, 'list');
exports.List = List;
