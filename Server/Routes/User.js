const express = require("express");
const user = require("../models/users");
const Post = require("../models/Post");
const Slide = require("../models/Slide");
const requireAuth = require("../middleware/requireAuth");
const Router = express.Router();

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

module.exports = Router;
