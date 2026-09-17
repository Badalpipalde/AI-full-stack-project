const mongoose = require("mongoose")

async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To Database");
    }

    catch(error){
        console.log(error);
    }

}


module.exports = connectToDb;
