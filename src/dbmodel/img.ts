/// <reference path="../../typings/index.d.ts" />

import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let options = {
  timestamps: true
}

let imgSchema = new Schema({
  title: {
    type: String,
    trim: true,
    default: Date.now()+'.jpg'
  },
  body: {
    type: Buffer,
    required: true
  },
  type: {
    type: String,
    trim: true
  }
}, options)

interface IImg extends mongoose.Document{
  title: string,
  body: Buffer,
  type: string,
  updatedAt: Date,
  createdAt: Date
}

// collection is img
let Img = mongoose.model<IImg>('Img', imgSchema, 'img');

export {Img, IImg};
