const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const { required } = require("joi");

const listingSchema = new Schema ({
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
    },
    image : {
        url :String,
        filename: String,       
    },
    price : {
        type: Number,
       
    },
    location : {
        type: String,
    },
    country : {
        type: String,
    },
    category: {
        type:[
        {
            type: String,
            enum:["coastal charm","snug spaces","iconic cities","mountains","castle","amazing pools","camping","farms area","arctic","dome","boats"],
            
        },

    ],
    required:true,
    validate:[array =>array.length>0,'at least one category must be selected']
},
    favlisting : [
        {
            type : Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing.reviews.length){
        await Review.deleteMany({_id : {$in: listing.reviews}})
    }
})


const Listing = mongoose.model("Listing",listingSchema);
module.exports= Listing;
