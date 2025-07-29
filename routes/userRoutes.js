const express = require("express");
const router = express.Router();
const wrappAsync = require("../utils/wrappAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/userCallBack.js");


router.route("/signup")
    .get(userController.getSignup)
    .post(wrappAsync(userController.postSignup));

router.route("/login")
    .get(userController.getLogin)
    .post(saveRedirectUrl ,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),
        wrappAsync(userController.postLogin));


router.get("/logout", userController.logout);

//privacy and terms

router.get("/privacy",(req,res)=>{
    res.render("privacy & terms/privacy.ejs");
})

router.get("/terms",(req,res)=>{
    res.render("privacy & terms/terms.ejs");
})

module.exports = router;