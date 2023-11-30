const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Virtual for post's url
CommentSchema.virtual("url").get(function() {
  return `/posts/:postId/comments/${this._id}`;
});

// Virtual for formatted date
CommentSchema.virtual("timestamp_formatted").get(function() {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model("Comment", CommentSchema);