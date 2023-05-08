const express = require("express");
const { getAllMenusOfRest, addMenusOfRest, getMenuById } = require("../Controllers/MenusController");
const MenusRouter = express.Router();




MenusRouter.get("/:id",getMenuById)
MenusRouter.post("/",addMenusOfRest);

module.exports = MenusRouter;