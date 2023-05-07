const mongoose = require("mongoose");

const MenusSchema = mongoose.Schema({
    rest : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    name  : {
        type : String ,
    },
    logoUrl : {
        type : String ,
    },
    desc : {
        type : String,
    },   
    avg : {
        type : String,
    },
    type : {
        type : String ,
    },
    calories : {
        type : String,
    },
    size : {
        type :String,
    },
    cooking : {
        type :String
    }
 
},{
    timestamps : true
})


const Menus = mongoose.model("Menus" , MenusSchema)
module.exports = Menus ;