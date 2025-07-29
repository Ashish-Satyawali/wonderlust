let mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
// console.log(initData)


main()
.then((res)=>{
    console.log("connected");
})
.catch((err)=>{
    console.log("err")
})

async function main () {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const initDB= async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '6879f0a4c025970fd3769570'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}

initDB();
