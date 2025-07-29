const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");


module.exports.addReview = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created");
      
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate( id, { $pull: { reviews: reviewId}})
    let delReview = await Review.findByIdAndDelete(reviewId);
    console.log(delReview)
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};  