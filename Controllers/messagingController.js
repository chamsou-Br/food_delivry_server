
const User = require("../Modals/userModal");
const admin = require("../firebase")
const jwt = require('jsonwebtoken');

 const setMsgValidated = async (req , res) => {
    try {
        const user = await User.findOne({email : req.body.client})
        if (user.tokens) {
            user.tokens.forEach(async token => {
                const message = {
                    notification: {
                      title: req.body.title,
                      body: req.body.body,
                    },
                    token: token
                  };
                  await admin .messaging().send(message)
            });
        }

        res.status(200).send("sucess");

    } catch (error) {
        console.log(error)
        res.status(404).send("errour")
    }
}

const addTokenToUser = async (req , res) =>{
try {
        let userId;
        userId = await jwt.verify(req.body.client,"food_delivry").id; 
        const user = await User.findById(userId)

    if (!user) res.status(404).send(null);
    
    if (user.tokens) {
        if ( !user.tokens.includes(req.body.token)) {
            user.tokens = [...user.tokens , req.body.token]
        }
    }else {
        user.tokens = [req.body.token]
    }
    await user.save()
    res.send("sucess")
} catch (error) {
    console.log(error)
    res.status(404).send("erreur")
}

}
module.exports = {setMsgValidated , addTokenToUser}