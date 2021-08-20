const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  sessionLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sessionMember: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  sessionDate: [
    {
      type: Date,
    },
  ],
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = { Session };
