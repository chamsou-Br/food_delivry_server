const express = require("express");
const { getAllOrdersOfClient, addOrder } = require("../Controllers/OrderController");
const OrderRouter = express.Router();




OrderRouter.get("/client/:id",getAllOrdersOfClient)
OrderRouter.post("/",addOrder);

module.exports = OrderRouter;