const express = require("express");
const { Post } = require("../models/Post");
const router = express.Router();
const { Session } = require("../models/Session");
const { User } = require("../models/User");
const { upload } = require("./utils/imageUpload");

// 세션 생성
router.post("/create", (req, res) => {
  console.log(req.body)
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

// 세션 찾기 (쿼리에 아무것도 안넣으면 모든 세션을 불러옴 )
router.get("/findSession", (req, res) => {
  let sessionName = req.query.name;
  console.log(sessionName)
  Session.find({ sessionName: sessionName }).exec((err, sessionInfo) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, sessionInfo });
  });
});

// 세션 
router.get("/sessionList", (req, res) => {
  Session.find({}, (err, sessionList) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true, sessionList });
    }
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
  Session.deleteOne({ sessionName: _sessionName }, err => {
    if (err) {
      res.json({ success: false, err });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

// 한 세션의 포스트 모두 불러오기
// query ?name=SESSION_NAME 으로 요청
router.get("/loadPosts", (req, res) => {
  let _sessionName = req.query.name;
  Post.find({ sessionName: _sessionName }, (err, postList) => {
    if (err) return res.json({ err });
    return res.json({ postList });
  });
});

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장함.
  upload(req, res, err => {
    console.log(res.req.file);
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
