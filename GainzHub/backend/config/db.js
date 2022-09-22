const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async() =>{
    try{

        //Try connecting to mongodb
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log("MongoDB Successfully Connected...");
    }
    catch(err){
        console.error(err.message);
        
        //Kill backend process with mongodb connection error.
        process.exit(1);
    }
}

module.exports = connectDB;