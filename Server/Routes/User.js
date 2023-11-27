const express = require("express");
const User = require("../models/users");
const Post = require("../models/Post");
const Slide = require("../models/Slide");
const requireAuth = require("../middleware/requireAuth");
const Router = express.Router();
const mongoose = require("mongoose");

Router.get("/slide/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const FindUser = await Slide.findById(id);
    if (!FindUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(FindUser);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

Router.put("/slide/likes/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const userid = req.user;
  try {
    const slide = await Slide.findById(id);

    if (!slide) {
      return res.status(404).send({ message: "No Slide Found" });
    }

    if (slide.likes.includes(userid)) {
      const index = slide.likes.indexOf(userid);
      if (index !== -1) {
        slide.likes.splice(index, 1);
        await slide.save();
        return res.status(200).send({ message: "unliked" });
      }
    } else {
      slide.likes.push(userid);
      await slide.save();
      return res.status(200).send({ message: "liked" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

Router.post("/bookmarks/:slideid", requireAuth, async (req, res) => {
  const userid = req.user;
  const { slideid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(slideid)) {
    return res.status(400).send({ message: "Invalid slide ID" });
  }

  try {
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).send({ message: "Not a User" });
    }
    if (user.bookmarks.includes(slideid)) {
      const index = user.bookmarks.indexOf(slideid);
      if (index !== -1) {
        user.bookmarks.splice(index, 1);
        await user.save();
        return res.status(200).send({ message: "bookmark removed" });
      }
    } else {
      user.bookmarks.push(slideid);
      await user.save();
      return res.status(200).send({ message: "bookmark added" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

Router.get("/user/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

Router.get("/showbookmarks", requireAuth, async (req, res) => {
  const userid = req.user;
  try {
    const bookmarks = await User.findById(userid).populate("bookmarks");
    if (!bookmarks) {
      return res.status(404).send({ message: "No bookmarks found" });
    }
    return res.status(200).send(bookmarks);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = Router;
