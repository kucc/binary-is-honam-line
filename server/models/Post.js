const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  imageAddress: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
  },

  attendance: [
    {
      userName: String,
      attend: Boolean,
    },
  ],

  sessionName: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
