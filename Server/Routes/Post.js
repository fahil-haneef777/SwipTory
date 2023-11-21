const express = require("express");
const Slide = require("../models/Slide");
const Post = require("../models/Post");
const Router = express.Router();
const requireauth = require("../middleware/requireAuth");

Router.post("/add", requireauth, async (req, res) => {
  const { slides } = req.body;
  try {
    const AllSlides = slides.map((slideData, index) => {
      return new Slide({
        slideNumber: index + 1,
        heading: slideData.heading,
        description: slideData.description,
        imageUrl: slideData.imageUrl,
        category: slideData.category,
        likes: [],
      });
    });
    const dbslides = await Slide.create(AllSlides);

    const post = new Post({
      slides: dbslides.map((slide) => slide._id),
      postedBy: req.user,
    });

    post.save();
    res.status(200).send({ message: "Posted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error", error: error });
  }
});

module.exports = Router;
