const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "USER",
      required: true,
    },

    username: {
      type: String,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "POST",
    },
  },
  { timestamps: true }
);

const comment_model = mongoose.model("comment", schema);

module.exports = comment_model;
