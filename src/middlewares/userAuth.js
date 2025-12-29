const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const userAuth = async (req, res, next) => {
  try {
    const {token} = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }

    const decodedObj = await jwt.verify(token, "Sikari@18158920");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.send("ERROR " + err.message);
  }
};

module.exports = { userAuth };
