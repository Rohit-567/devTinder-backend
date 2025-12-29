const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const { validateEditProfileData } = require("../utils/signUpValidation");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("ERROR " + err.message);
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("fields not allowed to update");
    }
    const logedInUser = req.user;
    Object.keys(req.body).forEach((key) => (logedInUser[key] = req.body[key]));

    await logedInUser.save();

    res.send("update successfully");
  } catch (err) {
    res.status(400).send("error while updating " + err.message);
  }
});

module.exports = { profileRouter };
