/// <reference path="../../typings/index.d.ts" />

import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let options = {
  timestamps: true
}

let linkSchema = new Schema({
  body: {
    type: String,
    trim: true,
    match: /https?:\/\/.+/
  }
}, options);

interface ILink extends mongoose.Document {
  body: string,
  updatedAt: Date,
  createdAt: Date
}

let Link = mongoose.model<ILink>('Link', linkSchema, 'link');

export {Link, ILink};
