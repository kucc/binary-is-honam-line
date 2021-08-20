const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

const { Session } = require("../models/Session");
const { User } = require("../models/User");
const { upload } = require("./utils/imageUpload");

// 포스트 생성
// {
//   date: Date,
//   imageAddress: String,
//   sessionName: String
// }
// 형태로 보내기

router.post("/create", (req, res) => {
  User.findAll((err, userList) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      const pyProg = spawn("python3", [
        "./utils/faceDetection/make_descs.py",
        Json.parse(`{${userList}}`),
      ]);
    }
  });
  const post = new Post(req.body);
});

module.exports = router;
