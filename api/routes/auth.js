require('dotenv').config();
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require('crypto-js');
const verify = require("../verifyToken");
const _ = require('lodash');
const jwt = require('jsonwebtoken');

//Register user
router.post("/register", async (req, res) => {
    try{
        //create new user
    const newUser = new User({
     fullname: req.body.fullname,
     email: req.body.email,
     unit: req.body.unit,
     isAdmin: req.body.isAdmin,
     phone: req.body.phone,
     location: req.body.location,
     adminrights: req.body.adminrights,
     password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        });
        //save user return response
        const user = await newUser.save();
        res.status(200).json(user);
       }catch(err){
        res.status(500).json(err);
    }
    
})



const generateAccessToken = (user)=>{
    return jwt.sign({id: user._id, isAdmin: user.isAdmin},
        process.env.JWTSECRET_KEY, 
        {expiresIn: "60d"})  
}


//LOGIN
router.post('/login', async (req, res) => {   
try{
    const user = await User.findOne({email: req.body.email})
    if(!user){
      return res.status(401).json("wrong password or username");
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if(originalPassword !== req.body.password){
        return res.status(401).json('Wrong password or username!');
    } 

    //jwt token addition
    const accessToken = generateAccessToken(user);
    

    const {password, ...info } = user._doc;
   res.status(200).json({...info, accessToken});


}catch(err){
   res.status(500).json(err);
}
})


module.exports = router;