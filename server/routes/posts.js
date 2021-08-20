const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

const { Session } = require("../models/Session");
const { User } = require("../models/User");
const { upload } = require("./utils/imageUpload");
const { Post } = require("../models/Post");

// 포스트 생성
// {
//   date: Date,
//   imageAddress: String,
//   sessionName: String
// }
// 형태로 보내기

router.post("/create", (req, res) => {
  const pyProg = spawn("python3", [
    "./utils/faceDetection/run_dect.py",
    req.body.imageAddress,
  ]);
  pyProg.stdout.on("data", data => {
    console.log(data);
    Session.findOne({ sessionName: req.body.sessionName }, (err, session) => {
      let attendance = [];
      session.sessionMember.forEach(item => {
        attendance.push({ userName: item, attend: false });
      });
      data.sessionAttendMember.forEach(item => {
        attendance.find(e => {
          return e.userName == item;
        }).attend = true;
      });
      console.log(attendance);
      req.body.attendance = attendance;
    });
  });
  const post = new Post(req.body);
  post.save(err => {
    res.json({ success: true });
  });
});

module.exports = router;
