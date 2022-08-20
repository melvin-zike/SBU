const router = require("express").Router();
const Target = require("../models/Targets");
const User = require('../models/User');
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {

    const newTarget = new Target(req.body);
    try {
      const savedTarget = await newTarget.save();
     return res.status(201).json(savedTarget);
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

router.get("/timeline/:userId", verify, async (req, res) => {
  try{
      const currentUser = await User.findById(req.params.userId);
      const userTargets = await Target.find({ userId: currentUser._id })
      const friendTarget = await Promise.all(
          currentUser.followings.map((friendId) => {
              return Target.find({ userId: friendId });
          }));
         return res.status(200).json(userTargets.concat(...friendTarget));
  }catch(err){
      return res.status(500).json(err);
  }
})

//UPDATE

router.put("/:id", verify, async (req, res) => {
    try {
      const updatedTarget = await Target.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTarget);
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  
    try {
      const target = await Target.findByIdAndDelete(req.params.id);
      if((target.userId === req.body.userId) || req.user.isAdmin){
        await target.deleteOne();
    res.status(200).json("Post deleted");
        
      }else{
        return res.status(403).json("you can delete only your post");
      }
    } catch(err) {
     return res.status(500).json(err);
    }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const target = await Target.findById(req.params.id);
    return res.status(200).json(target);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//credit a movie
router.put('/:id/credit', verify, async (req, res ) => {
  if(req.body.userId !== req.params.id){
      try{
          const target = await Target.findById(req.body.postId);
             await target.updateOne({$inc: {credit: req.body.amount}});
             return res.status(200).json("Thanks for voting!");
    
      }catch(err){
        return res.status(500).json(err)
      }
  }else{
      return res.status(403).json("you cannot vote for yourself")
  }
})



//edit achieved score in targets
router.put('/:id/achieve', verify, async (req, res ) => {
  if(req.body.userId !== req.params.id){
      try{
          const target = await Target.findById(req.body.targetId);
             await target.updateOne({$inc: {achievedscore: req.body.achieved}});
             return res.status(200).json("You have added a score!");
    
      }catch(err){
        return res.status(500).json(err)
      }
  }else{
      return res.status(403).json("you cannot vote for yourself")
  }
})

//GET ALL

router.get("/", verify, async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin ) {
    try {
      const targets = await Target.find().limit(100);
      res.status(200).json(targets.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//get all a users Targets
router.get("/profile/:fullname", verify, async (req, res) => {
  try{
      const user = await User.findOne({fullname:req.params.fullname})
      const targets = await Target.find({userId:user._id})
      res.status(200).json(targets)
  }catch(err){
      res.status(500).json(err)
  }
})

module.exports = router;