const express = require("express");
const Slide = require("../models/Slide");
const Post = require("../models/Post");
const Router = express.Router();
const requireauth = require("../middleware/requireAuth");
const requireAuth = require("../middleware/requireAuth");

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

Router.get("/allpost", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("slides");
    res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

Router.get("/filter/:category", async (req, res) => {
  const { category } = req.params;
  try {
    let posts;
    if (category === "All") {
      posts = await Post.find({}).populate("slides");
    } else {
      posts = await Post.find({}).populate({
        path: "slides",
        match: { category: category },
      });
    }
    res.status(200).send({ posts });
  } catch (err) {
    console.log(err);
  }
});

Router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("slides");
    res.status(200).send({ post });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

Router.put("/edit/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { slides } = req.body;
  try {
    const oldPost = await Post.findById(id);
    await Slide.deleteMany({ _id: { $in: oldPost.slides } });

    const newSlides = await Slide.create(slides);
    oldPost.slides = newSlides.map((slide) => slide._id);
    await oldPost.save();

    res.status(200).send({ message: "updated successfully" });
  } catch (err) {
    res.status(400).send({ message: "error" });
  }
});

module.exports = Router;
