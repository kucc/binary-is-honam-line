const express = require("express");
const { User } = require("../models/User");
const { Session } = require("../models/Session");

const router = express.Router();

router.post("/", (req, res) => {
  let session = new Session({
    sessionName: "test4",
    sessionLeader: User.findOne({
      name: "test1",
    })._id,
    sessionMember: [
      User.findOne(
        {
          name: "test2",
        },
        (err, user) => {
          return user._id;
        }
      ),
      User.findOne(
        {
          name: "test3",
        },
        (err, user) => {
          return user._id;
        }
      ),
    ],
  });

  session.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });

  // let body = {
  //   name: "test4",
  //   email: "test4@naver.com",
  //   session: [session._id],
  // };

  // const user = new User(body);

  // user.save((err, doc) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({
  //     success: true,
  //   });
  // })
});

module.exports = router;
