const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName:{
    type: String
  },
  emailId:{
    type: String,
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value))
      {
        throw new Error("Invalid email address " + value);
      }
    }
  },
  age:{
    type: Number,
    min: 18

  },
  password:{
    type: String,
    validate(value){
      if(!validator.isStrongPassword(value))
      {
        throw new Error("Please enter Strong password mix of upper Case lower Case and use number and symbol")
      }
    }
  },
  gender:{
    type: String,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new Error("enter a valid gender");
      }
    }
  }
},{timestamps:true}
);


userSchema.methods.validatePassword = async function (password){
  user = this
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid
}

userSchema.methods.createJwt = async function (){
  user = this

const token = await jwt.sign({ _id: user._id }, "Sikari@18158920",{expiresIn:"1h"});
return token
}


module.exports = mongoose.model("User",userSchema);
