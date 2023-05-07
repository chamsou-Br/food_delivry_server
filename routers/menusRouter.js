const express = require("express");
const { getAllMenusOfRest, addMenusOfRest } = require("../Controllers/MenusController");
const MenusRouter = express.Router();



MenusRouter.get("/:id" , getAllMenusOfRest);

MenusRouter.post('/',addMenusOfRest);

module.exports = MenusRouter