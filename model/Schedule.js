const mongoose = require('mongoose');
module.exports = mongoose.model("Schedule", new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    work_from: {
        type: String,
        required:[true,"Please Add Work From Time"]
    },
    work_to: {
        type: String,
        required: [true, "Please Add Work From Time"]
    },
    break_from: {
        type: String,
        required: [true, "Please Add Work From Time"]
    },
    break_to: {
        type: String,
        required: [true, "Please Add Work From Time"]
    },
    period: {
        type: String,
        required: [true, "Please Add Period"],
        enum:["month","week"]
    },
    days: {
        type: Array,
        required:[true,"Please Add Work Days"]
    },
    expired: {
        type: Boolean,
        default:false
    }
},{timestamps:true}))