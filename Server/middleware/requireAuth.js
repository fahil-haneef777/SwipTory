const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).send({ message: "Unauthorized User!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    console.log(decoded.userid);
    req.user = decoded.userid;
    next()
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
};

module.exports = requireAuth;
