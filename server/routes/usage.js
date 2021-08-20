const express = require("express");
const { Usage } = require("../models/Usage");
const router = express.Router();

router.post("/create", (req, res) => {
  const Usage = new Usage(req.body);
  Usage.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
  Usage.find({})
    .then(users=>{
      console.log(users); // 모든 유저 정보 출력
    });
});

router.get("/usagestatus", (req, res) => {
  Usage.find({}, (err, usage) => {
    console.log(usage)
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true, usage });
    }
  });
});


module.exports = router;
