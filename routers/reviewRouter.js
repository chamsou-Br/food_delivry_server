const express = require("express");
const { getAllMenusOfRest, addMenusOfRest, getMenuById } = require("../Controllers/MenusController");
const { getAllReviewOfRestaurant, addReviewOfRestaurant, getReviewOfClientToRest } = require("../Controllers/ReviewController");
const ReviewRouter = express.Router();




ReviewRouter.get("/restaurant/:id",getAllReviewOfRestaurant)
ReviewRouter.post("/",addReviewOfRestaurant);
ReviewRouter.post("/restaurant/:id/client",getReviewOfClientToRest)

module.exports = ReviewRouter;