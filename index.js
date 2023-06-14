const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const RestaurantRouter = require("./routers/restaurantsRouter");
const MenusRouter = require("./routers/menusRouter");
const userRouter = require("./routers/userRouter");
const OrderRouter = require("./routers/orderRouter");
const ReviewRouter = require("./routers/reviewRouter");

const app = express();

// Port Number
const PORT = process.env.PORT ||5000;

// Server Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.listen(PORT,console.log(
  `Server started on port ${PORT}`));

  // connect Database
mongoose.connect("mongodb://localhost:27017/food_delivry",{useUnifiedTopology : true , useNewUrlParser : true});
mongoose.connection.once('open',()=> {
    console.log("dataBase is related sucessfully");
})

// Handling GET request
app.get('/', (req, res) => {
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})


app.use("/menus",MenusRouter);
app.use('/restaurants',RestaurantRouter);
app.use("/auth",userRouter)
app.use("/order",OrderRouter)
app.use("/review",ReviewRouter)