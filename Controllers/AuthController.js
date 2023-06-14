const User = require("../Modals/userModal")
const auth =  require("../middlware/auth")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const LoginContoller = async(req , res) => {
       const {user,err} = await User.login(req.body.email,req.body.password);
       if (err) res.status(404).send(err) ;
       else {

        const token = await auth.getToken(user._id);
        res.cookie('food_delivry' , token,{
            httpOnly : true ,        
            maxAge : 12 * 30 * 24 * 3600 * 1000,
        });
        const userPayload = {
            email : user.email,
            fullName  : user.fullName,
            address : user.address,
            phone : user.phone,
            picture : user.picture,
            token
        }
        res.status(200).send(userPayload);
       }

}

const getProfileContoller = async(req , res) => {
    try{
        console.log(req.body);
        const authorization_header = req.headers.authorization;
        let clientId;
        if (authorization_header && authorization_header.toString().startsWith('Bearer ') ){
            let token = authorization_header.toString().split(' ')[1]
            clientId = jwt.verify(token, "food_delivry").id;
        }else {
            console.log(req.body.client,"client")
            clientId = jwt.verify(req.body.client, "food_delivry").id; 
        }
        const user = await User.findById(clientId);
        const token = await auth.getToken(user._id);
        console.log(user);
        const userPayload = {
            email : user.email,
            fullName  : user.fullName,
            address : user.address,
            phone : user.phone,
            picture : user.picture,
            token
        }
        res.status(200).send(userPayload);
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }

}

const EditProfileController = async( req , res) => {
    try {
        console.log(req.body," edit")
        const authorization_header = req.headers.authorization;
        let clientId;
        if (authorization_header && authorization_header.toString().startsWith('Bearer ') ){
            let token = authorization_header.toString().split(' ')[1]
            clientId = jwt.verify(token, "food_delivry").id;
        }else {
            clientId = jwt.verify(req.body.token, "food_delivry").id; 
        }
        const user = await User.findById(clientId);
        user.email = req.body.email;
        user.address = req.body.address;
        user.fullName = req.body.fullName
        user.phone = req.body.phone
        await user.save();
        const token = await auth.getToken(user._id);
        const userPayload = {
            email : user.email,
            fullName  : user.fullName,
            address : user.address,
            phone : user.phone,
            picture : user.picture,
            token
        }
        res.status(200).send(userPayload);
        
    } catch (error) {
        console.log(error)
        res.status(400).send(null)
    }
}

const RegisterConroller = async(req , res) => {
    const data = req.body;
          const {user , err} = await  User.register(data.fullName,data.email,data.password,data.phone , data.address , data.picture)
          if (err) {
              res.status(404).send(err);}
          else {
            const token = await auth.getToken(user._id);
            res.cookie('food_delivry' , token,{
                httpOnly : true ,        
                maxAge : 12 * 30 * 24 * 3600 * 1000,
            });
            const userPayload = {
                email : user.email,
                fullName  : user.fullName,
                address : user.address,
                phone : user.phone,
                picture : user.picture,
                token
            }
            res.status(200).json(userPayload);
          }
}



const uploadPicture = async (req , res) => {
    try {
        const authorization_header = req.headers.authorization;
        let clientId;
        if (authorization_header && authorization_header.toString().startsWith('Bearer ') ){
            let token = authorization_header.toString().split(' ')[1]
            clientId = jwt.verify(token, "food_delivry").id;
        }else {
            clientId = jwt.verify(req.body.client, "food_delivry").id; 
        }
        const user = await User.findById(clientId);
        let picture ;
        if (req.file && req.file.filename) picture = req.file.filename
        else picture = ""
        user.picture = "uploads/" + picture;
        await user.save();
        const token = await auth.getToken(user._id);
        const userPayload = {
            email : user.email,
            fullName  : user.fullName,
            address : user.address,
            phone : user.phone,
            picture : user.picture,
            token
        }
        res.status(200).send(userPayload);
        
    } catch (error) {
        console.log(error)
        res.status(400).send(null)
    }
}

module.exports = {RegisterConroller , LoginContoller , getProfileContoller , EditProfileController , uploadPicture}