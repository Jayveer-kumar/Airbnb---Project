const Listing=require("./models/Listing.js");
const expressError=require("./utils/expressError.js");
const Review=require("./models/review.js");
const { reviewSchema ,listingSchema}=require("./joiSchema.js");

module.exports.isLogedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectURl=req.originalUrl;
        req.flash("error","You must be loged in to create a listing : ");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectURl){
        res.locals.redirectURl=req.session.redirectURl;
    }
    next();
}

module.exports.isOwner= async (req,res,next)=>{
    const {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the owner of This Listing ");
        return res.redirect(`/Listing/${id}`); 
    }
    next();
}
module.exports.isReviewAuther= async (req,res,next)=>{
    const {reviewId,id}=req.params;  
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the owner of This Review ");
        return res.redirect(`/Listing/${id}`); 
    }
    next();
}

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(" , ");
        throw new expressError(400,errmsg);
    }else{
        next();
    }
};

module.exports.validateReview=async (req,res,next)=>{
    const {error}=reviewSchema.validate(req.body); 
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(", ");
        throw new expressError(400,errMsg);
    } else{
        next();
    } 
}