const express = require("express");
const router = express.Router();
const { Session } = require("../models/Session");
const { User } = require("../models/User");

// 세션 생성
router.post("/create", (req, res) => {
  const session = new Session(req.body);
  session.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
  session.sessionMember.map(item => {
    User.findOne({ name: item }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        user.session.push(session.sessionName);
        user.save();
      }
    });
  });
});

router.get("/findSession", (req, res) => {
  let sessionName = req.query.name;
  Session.find({ sessionName: sessionName }).exec((err, sessionInfo) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, sessionInfo });
  });
});

module.exports = router;
