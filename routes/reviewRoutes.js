const express = require("express");
const router = express.Router({mergeParams: true});
let mongoose = require("mongoose");
const wrapAsync = require("../utils/wrappAsync.js");
const {validateReview} = require("../middleware.js");
const {isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/reviewsCallBack.js")


// add review
router.post("/", isLoggedIn ,validateReview ,wrapAsync(reviewController.addReview));


//delete reviews
router.delete("/:reviewId" ,isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;