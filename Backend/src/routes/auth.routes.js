const express = require("express");
const authController = require("../controllers/auth.controller");
const userModel = require("../models/user.model");
const authRouter = express.Router();   //isme express require krne bad  router create krna padta hai
const authMiddleware = require("../middleware/auth.middleware");


/**
 * @route Post /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)


/**
 * @route Post /api/auth/login
 * @description login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)


/**
 * @route Get /api/post/logout
 * @description logout user with the help of token black listing
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)

/**
 * @route get/api/auth/get-me
 * @description idenfies which information  of currently loggged in user
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)


module.exports = authRouter;