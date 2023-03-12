const router = require("express").Router();
const Goal = require("../models/Goals");
const User = require("../models/User");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  const newGoal = new Goal(req.body);
  try {
    const savedGoal = await newGoal.save();
    return res.status(201).json(savedGoal);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/timeline/:userId", verify, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userGoals = await Goal.find({ userId: currentUser._id });
    const friendGoal = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Goal.find({ userId: friendId });
      })
    );
    return res.status(200).json(userGoals.concat(...friendGoal));
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedGoal);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (goal.userId === req.body.userId || req.user.isAdmin) {
      await goal.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      return res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    return res.status(200).json(goal);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//credit a movie
router.put("/:id/credit", verify, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const goal = await Goal.findById(req.body.postId);
      await goal.updateOne({ $inc: { credit: req.body.amount } });
      return res.status(200).json("Thanks for voting!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you cannot vote for yourself");
  }
});

//like a post
router.put("/:id/acknowledge", verify, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal.acknowledge.includes(req.body.fullname)) {
      await goal.updateOne({ $push: { acknowledge: req.body.fullname } });
      return res.status(200).json("The post has been acknowledged");
    } else {
      await goal.updateOne({ $pull: { acknowledge: req.body.fullname } });
      return res.status(200).json("The post has been unacknowledged");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//comment a post
router.put("/:id/comments", verify, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (
      !goal.comments.includes(req.body.userId) ||
      goal.comments.includes(req.body.userId)
    ) {
      await goal.updateOne({ $push: { comments: req.body } });
      return res.status(200).json("comment succesfull");
    }
  } catch (err) {
    return res.send(500).json(err);
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  try {
    const goals = await Goal.find().limit(100);
    res.status(200).json(goals.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all a users Goals
router.get("/profile/:fullname", verify, async (req, res) => {
  try {
    const user = await User.findOne({ fullname: req.params.fullname });
    const goals = await Goal.find({ userId: user._id });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
