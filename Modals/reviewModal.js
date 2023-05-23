const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    rest : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    client : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "client"
    },
    review : {
        type : String
    },
    rating : {
        type : Number
    },

 
},{
    timestamps : true
})


const Review = mongoose.model("Review" , ReviewSchema)
module.exports = Review;