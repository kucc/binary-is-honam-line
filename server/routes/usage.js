const express = require("express");
const { Usage } = require("../models/Usage");
const { User } = require("../models/User");
const router = express.Router();

router.post("/create", (req, res) => {
  console.log(req.body)
  // Usage(req.body).save()
  // .then(Usage.find({}, (err, users) => {
  //   console.log(users)
  // }))
  // const Usage = new Usage(req.body);
  // Usage.save((err, doc) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({
  //     success: true, 
  //   });
  // });
  Usage.findOneAndUpdate({}, {isUsage:req.body.isUsage }, (err, users) =>{
      console.log(users); // 모든 유저 정보 출력
    });
});

router.get("/usagestatus", (req, res) => {
  Usage.find({}, (err, usage) => {
    console.log(usage)
    const sendingUsage = usage[usage.length-1]
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true, sendingUsage});
    }
  });
});


module.exports = router;
