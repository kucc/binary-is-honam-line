const express = require("express");
const router = express.Router();
const { Session } = require("../models/Session");
const { User } = require("../models/User");
const { upload } = require("./utils/imageUpload");

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

// 세션 찾기
router.get("/findSession", (req, res) => {
  let sessionName = req.query.name;
  Session.find({ sessionName: sessionName }).exec((err, sessionInfo) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, sessionInfo });
  });
});

router.get("/updateSession");

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장함.
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
