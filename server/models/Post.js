const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> ca18cab60cd23c918b822788110d234388be612f
