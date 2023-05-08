const express = require("express");
const { getAllRestaurants, addRestaurant } = require("../Controllers/RestaurantsController");
const { getAllMenusOfRest } = require("../Controllers/MenusController");
const RestaurantRouter = express.Router();


RestaurantRouter.get("/" , getAllRestaurants);
RestaurantRouter.get("/:id/menus" , getAllMenusOfRest);
RestaurantRouter.get('/test', (req , res) => {
    res.send([
        {
            "name" :"Pzza Milano",
            "logoUrl"  : "https://images.pexels.com/photos/2755/restaurant.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
            "adress" : "oued soumer",
            "mapX" : "0",
            "mapY" : "0",
            "type" : "",
            "avg"  : 4.6,
            "review" : 30,
            "phone" :"+213664827074",   
            "email" : "jc_berkane@esi.dz",
            "instApp" : "fb://page/218641444910278",
            "instUrl" : "https://www.facebook.com/RenaultAlgerie/",
            "fbUrl" :"https://www.facebook.com/RenaultAlgerie/",
            "fbApp" : "fb://page/218641444910278"
         
        }
    ])
})
RestaurantRouter.post('/',addRestaurant);

module.exports = RestaurantRouter