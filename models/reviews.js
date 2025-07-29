const mongoose = require("mongoose");
// const { min, max } = require("../schema");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

const Review = new mongoose.model("Review" , reviewSchema);
module.exports = Review;