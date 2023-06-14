const express = require("express");
const { LoginContoller, RegisterConroller, getProfileContoller, EditProfileController, uploadPicture } = require("../Controllers/AuthController");
const { upload } = require("../middlware/auth");
const userRouter = express.Router();

userRouter.post("/login",LoginContoller)
userRouter.post("/profile",getProfileContoller)
userRouter.post("/edit",EditProfileController)
userRouter.post("/register",RegisterConroller)
userRouter.post("/picture",upload.single("picture"),uploadPicture)


module.exports = userRouter