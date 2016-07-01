/// <reference path="../../typings/index.d.ts" />
"use strict";
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let options = {
    timestamps: true
};
let imgSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: Date.now() + '.jpg'
    },
    body: {
        type: Buffer,
        required: true
    },
    type: {
        type: String,
        trim: true
    }
}, options);
// collection is img
let Img = mongoose.model('Img', imgSchema, 'img');
exports.Img = Img;
