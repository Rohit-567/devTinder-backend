const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://devTinder:HvT0DO2v6spm9GDZ@cluster0.yrsynig.mongodb.net/devTinder"
  );
};


module.exports = connectDb