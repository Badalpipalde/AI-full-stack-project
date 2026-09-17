require("dotenv").config();           //.env file variables can be used in entire express server this allows .config()
const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb();





app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})



