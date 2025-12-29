const validator = require("validator")


const signUpValidation = (req)=>{
    const {firstName, lastName, emailId, password} = req.body

    if(!firstName || !lastName)
    {
        throw new Error("enter a valid name");
    }

    if(!validator.isEmail(emailId))
    {
        throw new Error("enter a valid emial id");
    }

    if(!validator.isStrongPassword(password))
    {
        throw new Error("enter a strong Password")
    }
}

const validateEditProfileData = (req)=>{

    const ALLOWED_UPDATES = ["firstName", "lastName", "age",];

    const isAllowedUpdates = Object.keys(req.body).every((field) =>
      ALLOWED_UPDATES.includes(field)
    );
    return isAllowedUpdates
}

module.exports = {signUpValidation , validateEditProfileData}