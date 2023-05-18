const User = require("../Modals/userModal")
const auth =  require("../middlware/auth")
const bcrypt = require("bcrypt")

const LoginContoller = async(req , res) => {
       const {user,err} = await User.login(req.body.email,req.body.password);
       if (err) res.status(404).send(err) ;
       else {

        const token = await auth.getToken(user._id);
        res.cookie('step_service_save_your_time' , token,{
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

const RegisterConroller = async(req , res) => {
    const data = req.body;
          const {user , err} = await  User.register(data.fullName,data.email,data.password,data.phone , data.address , data.picture)
          if (err) {
              res.status(404).send(err);}
          else {
            const token = await auth.getToken(user._id);
            res.cookie('step_service_save_your_time' , token,{
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

module.exports = {RegisterConroller , LoginContoller}