const Restaurant = require("../Modals/RestaurantModal");
const Review = require("../Modals/reviewModal")
const jwt = require('jsonwebtoken');

 const getAllReviewOfRestaurant = async ( req , res) => {
    try {
        const review  = await Review.find({rest : req.params.id});
        res.status(200).send(review)
    } catch (error) {
        console.log(error)
        res.status(400).send(null)
    }
}

 const addReviewOfRestaurant = async ( req , res ) => {
    try {
        const authorization_header = req.headers.authorization;
        let clientId;
        if (authorization_header && authorization_header.toString().startsWith('Bearer ') ){
            let token = authorization_header.toString().split(' ')[1]
            clientId = jwt.verify(token, "food_delivry").id;
        }else {
            clientId = jwt.verify(req.body.client, "food_delivry").id; 
        }
        let review = await Review.findOne({rest : req.body.rest,client : clientId});
        if (review) {
            review.rating = req.body.rating;
            review.review = req.body.review;
            await review.save()
            const reviewsOfRest =  await Review.find({rest : req.body.rest});
            let rat = 0;
            for (let i =  0 ; i < reviewsOfRest.length ; i++){
                rat += reviewsOfRest[i].rating;
            }
            const rest = await Restaurant.findById(req.body.rest);
            rest.avg = ( rat /reviewsOfRest.length ).toString() 
            await rest.save();
        }else {
            review  = await Review.create({...req.body,client : clientId})
            const reviewsOfRest =  await Review.find({rest : req.body.rest});
            let rat = 0;
            for (let i =  0 ; i < reviewsOfRest.length ; i++){
                rat += reviewsOfRest[i].rating;
            }
            const rest = await Restaurant.findById(req.body.rest);
            rest.avg = ( rat /reviewsOfRest.length ).toString() 
            rest.review = (parseInt(rest.review) + 1 ).toString();
            await rest.save();
        }
        
        res.status(200).send(review);
    } catch (error) {
        console.log(error);
        res.status(400).send(null)
    }
}

 const getReviewOfClientToRest = async (req , res) => {
    try {
        const authorization_header = req.headers.authorization;
        let clientId;
        if (authorization_header && authorization_header.toString().startsWith('Bearer ') ){
            let token = authorization_header.toString().split(' ')[1]
            clientId = jwt.verify(token, "food_delivry").id;
        }else {
            clientId = jwt.verify(req.body.client, "food_delivry").id; 
        }
        const review  = await Review.findOne({rest : req.params.id,client :clientId });
        res.status(200).send(review)
    } catch (error) {
        console.log(error)
        res.status(400).send(null)
    }
}
module.exports = {getAllReviewOfRestaurant, addReviewOfRestaurant,getReviewOfClientToRest}