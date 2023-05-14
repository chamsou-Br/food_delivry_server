const express = require("express");
const { LoginContoller, RegisterConroller } = require("../Controllers/AuthController");
const userRouter = express.Router();

userRouter.post("/login",LoginContoller)
userRouter.post("/register",RegisterConroller)

module.exports = userRouter