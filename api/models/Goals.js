const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
     
    desc: {
        type: String,
    },

    duration: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    
},
{ timestamps: true }
);

module.exports = mongoose.model("Goal", GoalSchema);