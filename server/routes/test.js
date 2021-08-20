const express = require("express");
const { User } = require("../models/User");
const { Session } = require("../models/Session");

const router = express.Router();

router.post("/", (req, res) => {
  let session = new Session({
    sessionName: "test2",
  });

  session.save();

  let body = {
    name: "test2",
    email: "test2@naver.com",
    session: session._id,
  };

  const user = new User(body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
