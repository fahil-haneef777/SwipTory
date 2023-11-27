const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

router.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ name: name });
    if (existingUser) {
      return res.status(409).send({ message: "Username already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({ name, password: hashedPassword });
    await user.save();
    const payload = { userid: user._id };
    console.log(payload);
    const token = jwt.sign(payload, process.env.JWT_PASSWORD);
    res.send({
      token: token,
      name: user.name,
      userid: user._id,
      message: "User registered Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).send({ message: "all fields are required" });
    }
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).send({ message: "Invalid user! Please signup" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(user._id.toJSON());
    const token = await jwt.sign(
      { userid: user._id },
      process.env.JWT_PASSWORD
    );
    res.status(200).send({
      token: token,
      username: user.name,
      userid: user._id,
      message: "loggedin successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
