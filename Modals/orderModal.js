const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    rest : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    client : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "client"
    },
    address : {
        type : String
    },
    note : {
        type : String
    },
    orderItems  : [{
        orderItem : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Menus"
        } ,
        qty : {
            type: Number
        }
    }],
    priceTotal : {
        type : Number
    }
 
},{
    timestamps : true
})


const Order = mongoose.model("Order" , OrderSchema)
module.exports = Order;