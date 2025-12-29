const express = require("express");
const authRouter = express.Router();
const User = require("../models/userSchema");
const { signUpValidation } = require("../utils/signUpValidation");
const bcrypt = require("bcrypt");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  try {
    signUpValidation(req);
    const { password, firstName, lastName, emailId, gender, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      age,
      password: hashedPassword,
    });

    await user.save();
    console.log("user now save ", user);
    res.send("user regiestrated successfully");
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    if (!validator.isEmail(emailId)) {
      throw new Error("enter a valid email");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credetional");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.createJwt();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login successfully");
    } else {
      res.send("Invalid Credentioals");
    }
  } catch (err) {
    res.send("ERROR " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("logUot successfully");
});

module.exports = { authRouter };
