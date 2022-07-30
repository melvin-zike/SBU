const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String, required:true,
    },

    email: {
        type: String, required:true, unique: true
    },
    password: {
        type: String, 
    },
    resetLink: {
        data: String,
        default: ""
    },
    profilePic: {
        type: String, default: ""
    },
    isAdmin:{
        type:Boolean, default: false
    },
    adminrights:{
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    location:{
        type: String,
    },
    phone: {
        type: Number,
       
    },
    accountNumber: {
        type: Number,
       
    },
    unit: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);