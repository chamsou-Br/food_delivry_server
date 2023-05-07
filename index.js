const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const RestaurantRouter = require("./routers/restaurantsRouter");

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
mongoose.connect("mongodb+srv://chamsou:rHvedZRezJpvQR6K@cluster0.6p19hhh.mongodb.net/?retryWrites=true&w=majority",{useUnifiedTopology : true , useNewUrlParser : true});
mongoose.connection.once('open',()=> {
    console.log("dataBase is related sucessfully");
})

// Handling GET request
app.get('/', (req, res) => {
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})



app.use('/restaurants',RestaurantRouter);