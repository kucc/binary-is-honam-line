const express = require("express");
const { User } = require("../models/User");
const { Session } = require("../models/Session");

const router = express.Router();

router.post("/", (req, res) => {
  let body = {
    name: "test1",
    email: "test1@naver.com",
    session: new Session({}),
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
