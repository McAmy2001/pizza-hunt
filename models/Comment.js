const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema(
  {
    replyId: { 
      type: Schema.Types.ObjectId, 
      default: () => new Types.ObjectId() 
    },
    replyBody: { 
      type: String,
      required: true,
      trim: true 
    },
    writtenBy: { 
      type: String,
      required: true,
      trim: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: (createdAtVal) => dateFormat(createdAtVal) 
    }
  },
  {
    toJSON: { getter: true }
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: true,
      trim: true
    },
    commentBody: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    replies: [replySchema]
  },
  {
    toJSON: { virtuals: true, getter: true },
    id: false
  });

  CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
  });

const Comment = model('Comment', CommentSchema);

module.exports = Comment;