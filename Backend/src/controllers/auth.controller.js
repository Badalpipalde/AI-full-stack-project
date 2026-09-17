const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const tokenBlackListModel = require("../models/blacklist.model");


/**
 * @name registerUserController
 * @description registers users expect username email password from the body
 * @acess Public
 *  
 */
async function registerUserController(req,res){
      const { username, email, password } = req.body;
    
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "please provide username email and password"
            })
        }
    
        // check is user already exist or not 
        const isUserAlreadyExist = await userModel.findOne({
            $or: [{username},{email}]
        })

        if(isUserAlreadyExist){
            return res.status(400).json({
                message: "User is Already Registered with this Username or Email Address"
            })
        }

        const hash = await bcrypt.hash(password,10);

        const user = await userModel.create({
            username,
            email,
            password: hash
        });
        
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token);

    res.status(201).json({
        message: "User is Registered",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

        
}

async function loginUserController(req,res){
    console.log("REQ BODY:", req.body);
    const { email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    },process.env.JWT_SECRET,
    {expiresIn: "1d"})

    res.cookie("token", token);

    res.status(200).json({
        message:"User loggedIn successfully",
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })


}

async function logoutUserController(req,res){
    const token = req.cookies.token

    if(token){
        await tokenBlackListModel.create({token})
    }

    res.clearCookie("token");

    res.status(201).json({
        message:"user is logout successfully"
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}