const router = require("express").Router();
const Calender = require("../models/Calender");
const User = require("../models/User");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  const newCalender = new Calender(req.body);
  try {
    const savedCalender = await newCalender.save();
    return res.status(201).json(savedCalender);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/timeline/:userId", verify, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userCalender = await Calender.find({ userId: currentUser._id });
    const friendDate = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Date.find({ userId: friendId });
      })
    );
    return res.status(200).json(userCalender.concat(...friendDate));
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedCalenders = await Calenders.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCalenders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  try {
    const calenders = await Calender.findByIdAndDelete(req.params.id);
    if (calenders.userId === req.body.userId || req.user.isAdmin) {
      await calenders.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      return res.status(403).json("you can delete only your dates");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const calenders = await Calender.findById(req.params.id);
    return res.status(200).json(calenders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  try {
    const calenders = await Calender.find().limit(100);
    res.status(200).json(calenders.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all a users Goals
router.get("/profile/:fullname", verify, async (req, res) => {
  try {
    const user = await User.findOne({ fullname: req.params.fullname });
    const calenders = await Calender.find({ userId: user._id });
    res.status(200).json(calenders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
