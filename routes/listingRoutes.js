const express = require("express");
const router = express.Router({mergeParams: true});
let mongoose = require("mongoose");
const wrapAsync = require("../utils/wrappAsync.js");
const {isLoggedIn ,isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listingsCallBack.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const Listing = require("../models/listing.js");
const upload = multer({storage});


//allListings
router.get("/",wrapAsync(listingController.index)); 

//create new 
router.route("/new")
    .get(isLoggedIn ,listingController.getNewListing)
    .post(isLoggedIn ,upload.single('listing[image]'), validateListing , wrapAsync(listingController.postNewListing));
//search   
router.post("/search",wrapAsync(listingController.search));
//favourites
router.get("/:id/fav",isLoggedIn ,wrapAsync(listingController.postFav));

router.get("/fav", isLoggedIn ,wrapAsync(listingController.getFav));


//show , update and Delete
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn ,isOwner,upload.single('listing[image]'), validateListing , wrapAsync(listingController.updateListing))
    .delete(isLoggedIn ,isOwner, wrapAsync(listingController.destroyListings));


//edit 
router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync(listingController.editListing));

//category
router.get("/category/:category",wrapAsync(listingController.category));

module.exports= router;

