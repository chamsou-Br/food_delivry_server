const Menus = require("../Modals/MenusModal")

const getAllMenusOfRest = async (req , res) => {
    try {
        const menus = await Menus.find({rest : req.params.id})
        if (menus) res.send(menus)
        else res.send([])
    } catch (error) {
        res.send([])
    }
}

const getMenuById = async (req , res) => {
    try {
        const menus = await Menus.findById(req.params.id);
        if (menus) res.send(menus)
        else res.send(null)
    } catch (error) {
        res.send(null)
    }
}

const addMenusOfRest = async (req , res) => {
    try {
        await Menus.create(req.body)
        res.send("insert sucessfully")
    }catch(err) {
        console.log(err)
        res.send("insert failed")
    }
}

module.exports = {getAllMenusOfRest , addMenusOfRest , getMenuById}