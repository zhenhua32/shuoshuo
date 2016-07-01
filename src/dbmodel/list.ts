/// <reference path="../../typings/index.d.ts" />

import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let options = {
  timestamps: true
}

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

interface IList extends mongoose.Document {
  body: string,
  type: string,
  updatedAt: Date,
  createdAt: Date
}

let List = mongoose.model<IList>('List', listSchema, 'list');

export {List, IList};
