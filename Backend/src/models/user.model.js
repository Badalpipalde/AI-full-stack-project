const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true , "username is already taken"],
        required: [true, "username is required"]
    },

    email: {
        type: String,
        unique: [true , "email already exists"],
        required: [true, "email already exists"]
    },

    password:{
        type: String,
        required: [true, "password is required"]
    },
})

const userModel = mongoose.model("users" , userSchema);

module.exports = userModel;
