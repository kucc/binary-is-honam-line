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

// 세션 수정하기
router.post("/updateSession", (req, res) => {
  let _sessionName = req.query.name;
  let [sessionName, sessionLeader, sessionMember, sessionDate] = [
    req.body.sessionName,
    req.body.sessionLeader,
    req.body.sessionMember,
    req.body.sessionDate,
  ];
  Session.findOne({ sessionName: _sessionName }, (err, session) => {
    if (err) {
      return res.json({ err });
    } else {
      session.sessionName = sessionName ? sessionName : session.sessionName;
      session.sessionLeader = sessionLeader
        ? sessionLeader
        : session.sessionLeader;
      session.sessionMember = sessionMember
        ? sessionMember
        : session.sessionMember;
      session.sessionDate = sessionDate ? sessionDate : session.sessionDate;
      session.save((err, doc) => {
        if (err) {
          res.json({ success: false, err });
        } else {
          res.status(200).json({ success: true });
        }
      });
    }
  });
});

// 세션 삭제하기 (일단 보류)
router.get("/deleteSession", (req, res) => {
  let _sessionName = req.query.name;
  console.log(_sessionName);
  Session.deleteOne({ sessionName: _sessionName }, err => {
    if (err) {
      res.json({ success: false, err });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장함.
  upload(req, res, err => {
    console.log(res.req.file)
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
