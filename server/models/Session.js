const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  sessionName: {
    type: String,
    maxlength: 50,
    required: true,
  },
  sessionLeader: {
    type: String,
  },
  sessionMember: [
    {
      type: String,
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
