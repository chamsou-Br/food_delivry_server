const express = require("express");
const { getAllRestaurants, addRestaurant } = require("../Controllers/RestaurantsController");
const { getAllMenusOfRest } = require("../Controllers/MenusController");
const MenusRouter = express.Router();



MenusRouter.get("/:id" , getAllMenusOfRest);

MenusRouter.post('/',addRestaurant);

module.exports = MenusRouter