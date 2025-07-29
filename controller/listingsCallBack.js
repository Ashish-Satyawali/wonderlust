const Listing = require("../models/listing.js");


module.exports.index = async (req,res)=>{
    let allListings = await Listing.find();
    let user = req.user;
    res.render("listings/index.ejs",{allListings,user});
};

module.exports.category = async(req,res)=>{
    let {category} = req.params;
    let allListings = await Listing.find({category:category});
    let user = req.user;
    res.render("listings/index.ejs", {allListings,category,user});
};
module.exports.postFav = async (req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id);

    const index = list.favlisting.indexOf(req.user._id);
    if(index > -1){
        //remove from fav
        list.favlisting.splice(index,1);
    }
    else{
        //add to fav
        list.favlisting.push(req.user._id);
    }
    
    let saved = await list.save();
    
    res.redirect("/listings/fav");
};

module.exports.getFav = async (req,res)=>{
    let allListings = await Listing.find({favlisting:req.user._id});
    let user = req.user;
    res.render("listings/index.ejs",{allListings, user});
};

module.exports.search = async(req,res)=>{
    let {searchDestination} = req.body;
    console.log(searchDestination);
    let allListings = await Listing.find({$or: [{location:searchDestination}, {country: searchDestination} ]});  
    console.log(typeof allListings);
    if(allListings.length === 0){
        req.flash("error","Listings with the mentioned location/country doesn't exist")
        return res.redirect("/listings");
    }
    else{
        res.render("listings/index.ejs",{allListings});
    }
};

module.exports.getNewListing =  (req,res)=>{
    console.log(req.user);
    res.render("listings/new.ejs");
};

module.exports.postNewListing = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newlist = new Listing(req.body.listing); 
    newlist.owner = req.user._id; 
    newlist.image = {url,filename};
    let savedList = await newlist.save();
    console.log(savedList);
    req.flash("success","New Listing Addded");
    res.redirect("/listings");
};

module.exports.showListing =  async (req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id).populate({path: "reviews", populate : {path:"author"} }).populate("owner");
    if(!list) {
        req.flash("error","Listing does not Exist");
        return res.redirect("/listings");
    }   
     
    res.render("listings/show.ejs",{list});   
};

module.exports.editListing = async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list) {
        req.flash("error","Listing does not Exist");
        return res.redirect("/listings");
    }
    let originalUrl = list.image.url;
    let transformedUrl =  originalUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {list,transformedUrl});
};

module.exports.updateListing =  async (req,res)=>{
    let {id} = req.params;
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        req.body.listing.image = {url,filename};
    }
    console.log(req.body.listing);
    let saved = await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators: true , new : true})
    console.log(saved);
    req.flash("success","Listing Edited");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListings = async (req,res)=>{
    let {id} = req.params;
    let delList = await Listing.findByIdAndDelete(id)
    console.log(delList);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};