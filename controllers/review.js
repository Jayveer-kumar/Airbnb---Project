const Review=require("../models/review.js");
const Listing=require("../models/Listing.js");

module.exports.createReview=async (req,res)=>{
    let Review_listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    Review_listing.reviews.push(newReview);
    newReview.author=req.user;
    await newReview.save();
    await Review_listing.save();
    req.flash("Success","New Review Created");
    res.redirect(`/listing/${Review_listing._id}`);
};

module.exports.deleteReview=async(req,res)=>{  
    let {id,reviewId}= req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}); // Pull means delete 
    await Review.findByIdAndDelete(reviewId);
    req.flash("Success"," Review Deleted");
    res.redirect(`/listing/${id}`);
}; 