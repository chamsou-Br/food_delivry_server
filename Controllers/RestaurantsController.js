const Restaurant = require("../Modals/RestaurantModal");



const addRestaurant =  async (req , res) => {
  const rest = req.body;
  await Restaurant.create(rest);
  res.send("Insert sucess");
}

const getAllRestaurants = async (req, res) => {
try{
  const rests = await Restaurant.find({});
  console.log(rests)
  res.send(rests);
}
catch(err) {
  console.log(err,"err");
  res.send([]);
}
};



module.exports = { getAllRestaurants ,addRestaurant};