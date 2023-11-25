const express = require("express");
const User = require("../models/users");
const Post = require("../models/Post");
const Slide = require("../models/Slide");
const requireAuth = require("../middleware/requireAuth");
const Router = express.Router();

Router.post("/getpost", requireAuth, (req, res) => {
  const { filter } = req.body;
  try {


    
  } catch (err) {
    console.log(err);
  }
});
