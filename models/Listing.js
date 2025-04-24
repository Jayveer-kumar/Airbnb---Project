const { required } = require("joi");
const mongoose=require("mongoose");
const Review = require("./review.js");
const Schema=mongoose.Schema;
const  listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
       type: String,
       required:true,
    },
    image:{
        url:String,
        filename:String,
        // type:String,
        // default:"https://images.unsplash.com/photo-1730381519278-98516c85ef72?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set:(v)=>v===""?"https://images.unsplash.com/photo-1730381519278-98516c85ef72?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    price:{
     type:Number, 
     required:true,
    },      
    location:{ 
    type:String,
    required:true,
    },
    country:{
     type:String,  
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User", 
    }
})


// Async function me jo listing aa rhi hai bo delete hone wali hai or usi listing ke data ke sath kuch actions perform bhi kar sakte hai
listingSchema.post("findOneAndDelete" , async(Listing)=>{
    if(Listing){
        await Review.deleteMany({_id : {$in: Listing.reviews}});
    }
})


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;