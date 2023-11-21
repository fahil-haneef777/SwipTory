const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slide",
    },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
