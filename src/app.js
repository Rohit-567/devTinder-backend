const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const {authRouter} = require("./routes/authRoutes")
const {profileRouter} = require("./routes/profileRoutes")

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter)
app.use("/",profileRouter)

connectDb()
  .then(() => {
    console.log("database connected successfully");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("database conection not connected");
  });
