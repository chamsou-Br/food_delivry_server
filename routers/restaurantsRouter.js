const express = require("express");
const { getAllRestaurants, addRestaurant } = require("../Controllers/RestaurantsController");
const RestaurantRouter = express.Router();


RestaurantRouter.use(express.json());
RestaurantRouter.use(express.urlencoded({extended : true}));


RestaurantRouter.get("/" , getAllRestaurants);
RestaurantRouter.get("/tt",(req , res) => {
    res.send("test")
})
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