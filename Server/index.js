const express = require("express");
const bodyparser = require("body-parser");
const env = require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const Usermodal = require("./models/users");
const authRoutes = require("./Routes/auth");
const Slidemodal = require("./models/Slide");
const Postmodal = require("./models/Post");
const PostRoutes = require("./Routes/Post");
const User = require("./Routes/User");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send({ status: "success" });
});
app.use(authRoutes);
app.use(PostRoutes);
app.use(User);

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
