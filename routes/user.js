const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {savedRedirectUrl}=require("../middleware.js");
const userControllers=require("../controllers/users.js");

router.route("/signup")
.get(userControllers.renderSignUpForm)
.post(wrapAsync(userControllers.signUp));

router.route("/login")
.get(userControllers.renderLoginForm)
.post(savedRedirectUrl, passport.authenticate("local" ,{failureRedirect:"/login", failureFlash:true}) ,userControllers.login);
router.get("/logout",userControllers.logOut); 

module.exports=router; 