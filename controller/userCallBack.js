const User = require("../models/user.js");

module.exports.getSignup =  (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.postSignup = async (req,res,next)=>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({username,email});
        let saveUser = await User.register(newUser,password);
        console.log(saveUser);
        req.login(saveUser , (err)=>{
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wonderlust");
            res.redirect("/listings");
        })    
    }
    catch(err){
        req.flash("error" ,err.message);
        res.redirect("/signup");
    }
};

module.exports.getLogin = (req,res)=>{
    res.render("users/login.ejs"); 
};

module.exports.postLogin = async(req,res)=>{
        req.flash("success", "Welcome back to Wonderlust")
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","logged out");
        res.redirect("/listings");
    });
};
