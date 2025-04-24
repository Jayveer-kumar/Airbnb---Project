const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/Listing.js");
const mongodb_url="mongodb://127.0.0.1:27017/wonderLust";
main().then((res)=>{
    console.log(" DataBase is connected : ");
}).catch((err)=>{
    console.log(" some error in your syntax : ");
})
async function main() {
   await mongoose.connect(mongodb_url);
}
 
const initDB= async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"676480809199819bd59e88ff",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data Was Reinitialize: ");
}
initDB();