const express = require("express");
const { setMsgValidated, addTokenToUser } = require("../Controllers/messagingController");


const NotifRouter = express.Router();




NotifRouter.post("/validated",setMsgValidated)

NotifRouter.post("/token",addTokenToUser)

module.exports = NotifRouter;