const express = require("express");
const { getAllRestaurants, addRestaurant } = require("../Controllers/RestaurantsController");
const RestaurantRouter = express.Router();


RestaurantRouter.use(express.json());
RestaurantRouter.use(express.urlencoded({extended : true}));


RestaurantRouter.get("/" , getAllRestaurants);
RestaurantRouter.post('/',addRestaurant);

module.exports = RestaurantRouter