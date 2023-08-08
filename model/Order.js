const mongoose = require("mongoose");

module.exports = mongoose.model("Orders", new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    foods:Array,
    date: Date
},{timestamps:true}))