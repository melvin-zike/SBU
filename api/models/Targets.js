const mongoose = require("mongoose");

const TargetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    username: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    comments: {
      type: [
        {
          userId: {
            type: String,
            required: true,
          },
          username: {
            type: String,
          },
          body: {
            type: String,
            required: true,
          },

          reply: {
            type: [],
          },
        },
      ],
    },
    profilePic: {
      type: String,
      default: "",
    },

    desc: {
      type: String,
    },
    status: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    time: {
      type: String,
    },
    achievements: {
      type: String,
    },
    suggestions: {
      type: String,
    },
    overallscore: {
      type: Number,
    },
    personalscore: {
      type: Number,
    },
    achievedscore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Target", TargetSchema);
