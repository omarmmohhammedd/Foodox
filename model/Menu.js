const mongoose = require('mongoose');

module.exports = mongoose.model("Menu", new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    breakFast: Array,
    lunch: Array,
    drinks: Array,

},{timestamps:true}))