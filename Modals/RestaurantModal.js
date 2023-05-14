const mongoose = require("mongoose");


const RestaurantsSchema = mongoose.Schema({
    name : {
        type : String ,
    },
    logoUrl  : {
        type : String ,
    },
    adress : {
        type : String ,
    },
    mapX : {
        type : String,
    },
    
    mapY : {
        type :String,
    },
    type : {
        type : String ,
    },
    avg  : {
        type : String ,
    },
    review : {
        type : String ,
    },
    phone : {
        type : String,
    },
    email : {
        type :String,
    },
    instApp : {
        type :String
    },
    instUrl : {
        type : String
    },
    fbApp : {
        type : String
    },
    fbUrl : {
        type : String
    }
 
},{
    timestamps : true
})


const Restaurant = mongoose.model("Restaurant" , RestaurantsSchema)
module.exports = Restaurant ;