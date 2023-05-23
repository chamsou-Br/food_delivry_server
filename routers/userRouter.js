const express = require("express");
const { LoginContoller, RegisterConroller, getProfileContoller, EditProfileController } = require("../Controllers/AuthController");
const userRouter = express.Router();

userRouter.post("/login",LoginContoller)
userRouter.post("/profile",getProfileContoller)
userRouter.post("/edit",EditProfileController)
userRouter.post("/register",RegisterConroller)

module.exports = userRouter