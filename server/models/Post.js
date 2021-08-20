const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Session };
