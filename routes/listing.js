const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema , reviewSchema}=require("../joiSchema.js");
const expressError=require("../utils/expressError.js");
const Listing=require("../models/Listing.js");
const {isLogedIn , validateListing , isOwner}=require("../middleware.js");
const ListingControllers=require("../controllers/listing.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage}); // where save this image 

router.route("/listing")
.get( wrapAsync(ListingControllers.index)) 
.post(isLogedIn,upload.single("listing[image]"), wrapAsync(ListingControllers.createNewListing)); 

// validateListing,

router.get("/listing/new", isLogedIn,ListingControllers.renderNewFrom);

router.route("/listing/:id")
.get( wrapAsync(ListingControllers.showListing))
.put(isLogedIn ,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(ListingControllers.updateListing))
.delete(isLogedIn ,isOwner, wrapAsync(ListingControllers.deleteListing));

router.get("/listing/:id/edit",isLogedIn ,wrapAsync(ListingControllers.editListing));


module.exports=router; 


