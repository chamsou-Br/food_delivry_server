const Restaurant = require("../Modals/RestaurantModal");



const addRestaurant =  async (req , res) => {
  try {
    const rest = req.body;
    await Restaurant.create(rest);
    res.send("Insert sucess");
  } catch (error) {
    res.statusCode(404)
    res.send("failed")
  }

}

const getRestaurantById = async (req , res) => {
  try {
    const rest = await Restaurant.findById(req.params.id);
    res.send(rest);
  } catch (error) {
    res.statusCode(404)
    res.send(null)
  }
}

const getAllRestaurants = async (req, res) => {
try{
  const rests = await Restaurant.find({});
  console.log(rests)
  res.send(rests);
}
catch(err) {
  res.statusCode(404)
  res.send(err + "err");
}
};



module.exports = { getAllRestaurants ,addRestaurant , getRestaurantById};