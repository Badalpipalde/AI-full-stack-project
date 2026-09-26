const userModel = require("../models/user.model");  
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")
const BlackListModel = require("../models/blacklist.model")


async function authUser(req,res,next){
    const token = req.cookies.token;



    if(!token){
        return res.status(401).json({
            message: " token not found"
        })
    }

    const isTokenBlacklisted = await BlackListModel.findOne({
        token
    });

    const isTokenBlacklistedinRedis = await redis.get(token)

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "invalid token"
        })
    }

    if(isTokenBlacklistedinRedis){
        return res.status(401).json({
            message: "invalid token"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();    // agar ye nhi likha to decoded next controller me pass nhi ho payega
    }
    catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }
}

    module.exports = {
        authUser
    }
