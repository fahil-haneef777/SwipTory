const express = require("express");
const bodyparser = require("body-parser");
const env = require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const User = require("./models/users");
const authRoutes = require("./Routes/auth");
const Slide = require("./models/Slide");
const Post = require("./models/Post");
const PostRoutes = require("./Routes/Post");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send({ status: "success" });
});
app.use(authRoutes);
app.use(PostRoutes);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`server running and connected to db `);
    })
    .catch((err) => {
      console.log(err);
    });
});
