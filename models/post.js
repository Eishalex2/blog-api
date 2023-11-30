const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  published: { type: Boolean, default: false }
});

// Virtual for post's url
PostSchema.virtual("url").get(function() {
  return `/posts/${this._id}`;
});

// Virtual for formatted date
PostSchema.virtual("timestamp_formatted").get(function() {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model("Post", PostSchema);