if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
let app = express();
let port = 8080 ;
let path = require("path");
let mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const listingsRoutes = require("./routes/listingRoutes.js")
const reviewRoutes = require("./routes/reviewRoutes.js");
const session = require("express-session"); 
const MongoStore = require('connect-mongo');
const flash= require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
const userRoutes = require("./routes/userRoutes.js");

const dbUrl = process.env.ATLASDB_URL;

main()
.then((res)=>{
    console.log("connected"); 
})
.catch((err)=>{
    console.log("err")
})

async function main () {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs', ejsMate);

var methodOverride = require('method-override');
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended :true}));
app.use(express.json());

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter: 24 * 3600, 
});

store.on("error",()=>{
    console.log("Error in Mongo Sesion Store");
});

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error"); 
    res.locals.currUser = req.user;
    next();
})

app.use("/listings" , listingsRoutes);
app.use("/listings/:id/reviews/" , reviewRoutes);
app.use("/", userRoutes);


app.use((req,res,next)=>{
    next(new expressError(404,"page not found"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something is wrong"} = err;
    res.status(statusCode).render("listings/error.ejs" , {message});
}) 

app.listen(port,()=>{
    console.log("server is listening");
});





