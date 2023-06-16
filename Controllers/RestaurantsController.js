const Restaurant = require("../Modals/RestaurantModal");



const addRestaurant =  async (req , res) => {
  try {
    const rest = req.body;
    await Restaurant.create(rest);
    res.send("Insert sucess");
  } catch (error) {
    console.log(error)
    res.status(400).send("failed")
  }

}

const getRestaurantById = async (req , res) => {
  try {
    const rest = await Restaurant.findById(req.params.id);
    res.send(rest);
  } catch (error) {
    console.log(error)
    res.status(400).send(null)
  }
}

const getAllRestaurants = async (req, res) => {
try{
  const rests = await Restaurant.find({});
  res.send(rests);
}
catch(err) {
  console.log(err)
  res.status(400).send(err + "err");
}
};



module.exports = { getAllRestaurants ,addRestaurant , getRestaurantById};