/// <reference path="../../typings/index.d.ts" />

import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let options = {
  timestamps: true
}

let commentSchema = new Schema({
  body: {
    type: String,
    trim: true
  }
}, options);

interface IComment extends mongoose.Document {
  body: string,
  updatedAt: Date,
  createdAt: Date
}

let Comment = mongoose.model<IComment>('Comment', commentSchema, 'comment');

export {Comment, IComment};
