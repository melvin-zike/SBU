const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    executivesummary: {
      type: String,
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
    achievements: {
      type: String,
      default: "",
    },

    testimonies: {
      type: String,
    },
    time: {
      type: String,
    },
    financialincrease: {
      type: String,
    },
    pictures: {
      type: String,
    },

    projections: {
      type: String,
      default: "",
    },
    Conclusion: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
