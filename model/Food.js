const mongoose = require('mongoose')
module.exports = mongoose.model("Food", new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum:["breakfast","lunch","dinner"]
    },
    img: String,
    type:{
        type: String,
        enum:["food","drink"],required:true
    }
}))