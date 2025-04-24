const Listing=require("../models/Listing.js");
module.exports.index=async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("Listings/index.ejs",{allListings});    
};

module.exports.renderNewFrom=(req,res)=>{   
    res.render("Listings/new.ejs");
};
module.exports.showListing= async (req,res)=>{
    let {id}=req.params;
    const singleListing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!singleListing){
        req.flash("error","Listing you requsted does not exist!");
        res.redirect("/listing");
    }
    res.render("Listings/show.ejs",{singleListing,mapApi:process.env.GOOGLE_MAP_API});     
};
module.exports.createNewListing= async  (req,res,next)=>{    
    let url=req.file.path;
    let filename=req.file.filename; 
    const newListing= new Listing(req.body.listing);
    newListing.owner=req.user._id;  
    newListing.image={url,filename};  
    await newListing.save();  //  All Ok 
    req.flash("Success","New Listing Created"); 
    res.redirect("/Listing");// main Route per      
};
module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
    const placeListing= await Listing.findById(id);
    if(!placeListing){
        req.flash("error","Listing you requsted does not exist!");
    }
    let OriginalUrl = placeListing.image.url; // Corrected from imgae to image
    OriginalUrl = OriginalUrl.replace("/upload", "/upload/h_300,w_256");
    res.render("Listings/edit.ejs",{placeListing,OriginalUrl});    
 };

 module.exports.updateListing=async (req,res)=>{ 
     const {id}=req.params;    
     const updated_chng=  await Listing.findByIdAndUpdate(id,{...req.body.listing}); 
     if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        updated_chng.image={url,filename}; 
     }
     req.flash("Success"," Listing Updated");  
     res.redirect(`/Listing/${id}`);      
 };
 module.exports.deleteListing=async (req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    req.flash("Success","New Listing Deleted");
    res.redirect("/Listing");
}; 