const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  slideNumber: {
    type: Number,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
});
module.exports = mongoose.model("Slide", slideSchema);
