const jwt = require('jsonwebtoken');
const User = require("../Modals/userModal");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
  });
  
  const upload = multer({ storage: storage });

const checkuser =  (req , res , next) => {
    const token = req.cookies.jwt ;
    if (token) {
        jwt.verify(token,"food_delivry",async (err , encoded) => {
            if (err) {
                throw Error('error in JWT');
            }
            if (encoded) {
                const user = await User.findById(encoded.id);
                res.send({existe : true , user : user }) ;
            }
        })
    }
    else res.send({existe : false})
}

const getToken = async(id) => {
    return  jwt.sign({id} , "food_delivry" , {
         expiresIn : 3 * 60 * 60 * 24,
     })
 };


const HandlError = (err) => {
    let errors = { email: null, password: null,fullName : null  };
    if (err.code === 11000) {
        if (err.keyValue.email) {
            errors.email = 'that email is already registered';
        }
        else {
            errors.fullName = 'that fullName is already registered';
        }
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
    }
    if (err.message === 'incorrect Email') {
        errors.email = 'that Email is not registred !'
      }
      if (err.message === 'incorrect Password') {
        errors.password = 'that password is incorrect'
      }
    if (err.message === 'password min length') {

        errors.password = "Minimum password length is 6 characters"
    }
    return errors
}

module.exports = {getToken , HandlError , checkuser , upload}