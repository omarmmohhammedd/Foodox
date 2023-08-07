const mongoose = require('mongoose');

module.exports = mongoose.model("Users", new mongoose.Schema({
    username: {
        type: String,
        required:[true,"Please Enter Your Username"]
    },
    email: {
        type: String,
        required:[true,"Please Enter Your Email"],
        unique:true
    },
    password: {
        type: String,
        required:[true,"Please Enter Valid Password"]
    },
    phone: String,
    nickname: String,
    img: String,
    role: {
        type: String,
        default: "user"
    },
}))