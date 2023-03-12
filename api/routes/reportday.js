const router = require("express").Router();
const Reportday = require("../models/Reportday");
const User = require("../models/User");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  const newReportday = new Reportday(req.body);
  try {
    const savedReportday = await newReportday.save();
    return res.status(201).json(savedReportday);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/timeline/:userId", verify, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userReportday = await Reportday.find({ userId: currentUser._id });
    const friendDate = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Date.find({ userId: friendId });
      })
    );
    return res.status(200).json(userReportday.concat(...friendDate));
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedReportdays = await Reportday.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedReportdays);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  try {
    const reportdays = await Reportday.findByIdAndDelete(req.params.id);
    if (reportdays.userId === req.body.userId || req.user.isAdmin) {
      await reportdays.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      return res.status(403).json("you can delete only your dates");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const reportdays = await Reportday.findById(req.params.id);
    return res.status(200).json(reportdays);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  try {
    const reportdays = await reportday.find().limit(100);
    res.status(200).json(reportdays.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all a users Goals
router.get("/profile/:fullname", async (req, res) => {
  try {
    const user = await User.findOne({ fullname: req.params.fullname });
    const reportdays = await Reportday.find({ userId: user._id });
    res.status(200).json(reportdays);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
