const User=require("../models/user.js");

module.exports.renderSignUpForm=async (req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.signUp=async(req,res)=>{
   try{
    let {username ,email ,password}=req.body;
    let newUSer=new User({username,email});
    let registedUser=await User.register(newUSer,password); 
    req.login(registedUser,(err)=>{
       if(err){
        return next(err);
       }
       req.flash("success","Welcome To WonderLust : ");
       res.redirect("/listing");
    })   
   }catch(er){
    req.flash("error",er.message);
    res.redirect("signup"); 
   } 
     
};

module.exports.login=async (req,res)=>{
    req.flash("success", "Welcome back to wanderlust!");
    const redirectURl=res.locals.redirectURl || "/listing"; // means user home page se hi login kar rha hai to us time per is loggedin middlewre trigger hi nhi hoga jiski bajah se redirectUrl undefined hoga to page not found btaega isiliye OR operator ka use kiya hai ki ggar koi url hai to wahi redirect karo nhi to /listing per
    res.redirect(redirectURl);
};

module.exports.logOut=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        } 
        req.flash("success","You are now logged Out : "); 
        res.redirect("/listing");
    });
};