if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const mongodb_url="mongodb://127.0.0.1:27017/wonderLust";
const path=require("path");
const methodOverride=require("method-override"); 
const ejs_mate=require("ejs-mate");// For avoinding duplicate code  like header  , footer
const expressError=require("./utils/expressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const passportLocalStrategy=require("passport-local");
const User=require("./models/user.js");
const userRouter=require("./routes/user.js");
const Listings=require("./routes/listing.js");
const review=require("./routes/review.js");

main().then((res)=>{
    console.log(" DataBase is connected : ");
}).catch((err)=>{
    console.log(" Some Error to Connect Database: ");
})
async function main() {
   await mongoose.connect(mongodb_url);
}


mongoose.set("strictPopulate", false);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));// for post request
app.use(methodOverride("_method")); 
app.engine('ejs',  ejs_mate); 

const sessionOption={
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now + 7 *24*60*60*1000,
        maxAge:7 *24*60*60*1000,
        httpOnly:true,
    },
};
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
   res.locals.success=req.flash("Success"); 
   res.locals.error=req.flash("error"); 
   res.locals.currentUser=req.user;
   next();
});
 
app.use("/",Listings);
app.use("/listing/:id/review",review);
app.use("/",userRouter);   


app.all("*",(req,res,next)=>{ 
    next(new expressError(404," Page not Found"));  
})

app.use((err,req,res,next)=>{   
    let { statuscode=500,message="something went wrong"}=err;
    res.status(statuscode).render("Listings/error.ejs",{message});
})

 app.listen(8080,()=>{
     console.log(" Server is Listing At 8080 port");
})  