const router = require("express").Router();
const Report = require("../models/Reports");
const User = require('../models/User');
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {

    const newReport = new Report(req.body);
    try {
      const savedReport = await newReport.save();
     return res.status(201).json(savedReport);
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

router.get("/timeline/:userId", verify, async (req, res) => {
  try{
      const currentUser = await User.findById(req.params.userId);
      const userReports = await Report.find({ userId: currentUser._id })
      const friendReport = await Promise.all(
          currentUser.followings.map((friendId) => {
              return Report.find({ userId: friendId });
          }));
         return res.status(200).json(userReports.concat(...friendReport));
  }catch(err){
      return res.status(500).json(err);
  }
})

//UPDATE

router.put("/:id", verify, async (req, res) => {
    try {
      const updatedReport = await Report.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedReport);
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  
    try {
      const report = await Report.findByIdAndDelete(req.params.id);
      if((report.userId === req.body.userId) || req.user.isAdmin){
        await report.deleteOne();
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
    const report = await Report.findById(req.params.id);
    return res.status(200).json(report);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//credit a movie
router.put('/:id/credit', verify, async (req, res ) => {
  if(req.body.userId !== req.params.id){
      try{
          const report = await Report.findById(req.body.postId);
             await report.updateOne({$inc: {credit: req.body.amount}});
             return res.status(200).json("Thanks for voting!");
    
      }catch(err){
        return res.status(500).json(err)
      }
  }else{
      return res.status(403).json("you cannot vote for yourself")
  }
})

//comment a post
router.put("/:id/comments", verify, async(req, res) => {
  try{
      const report = await Report.findById(req.params.id);
     if(!report.comments.includes(req.body.userId) || report.comments.includes(req.body.userId)){
      await report.updateOne({$push: { comments: req.body }});
       return res.status(200).json("comment succesfull");
    }
  }catch(err){
      return res.send(500).json(err);
  }
  
})

//GET ALL

router.get("/", verify, async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin ) {
    try {
      const reports = await Report.find().limit(100);
      res.status(200).json(reports.reverse());
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
      const reports = await Report.find({userId:user._id})
      res.status(200).json(reports)
  }catch(err){
      res.status(500).json(err)
  }
})

module.exports = router;