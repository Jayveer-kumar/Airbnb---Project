const express=require("express");
const router=express.Router({mergeParams:true});
const expressError=require("../utils/expressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const { reviewSchema}=require("../joiSchema.js");
const Listing=require("../models/Listing.js");
const {validateReview, isLogedIn , isReviewAuther}=require("../middleware.js")
const ReviewController=require("../controllers/review.js");

router.post("/",isLogedIn,validateReview ,wrapAsync (ReviewController.createReview));

// Delete Review 
router.delete("/:reviewId", isLogedIn,isReviewAuther,wrapAsync(ReviewController.deleteReview))

module.exports=router;