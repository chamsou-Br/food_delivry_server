const { default: mongoose } = require("mongoose");
const {isEmail} = require("validator")
const auth =  require("../middlware/auth")
const bcrypt = require("bcrypt")



const UserSchema = mongoose.Schema({
    fullName : {
        type : String ,
        required : [true,'Please enter an fullName'], 
        unique : true,
    },
    email : {
        type : String ,
        required : [true,'Please enter an Email'],
        validate : [isEmail ,'Please enter a valid email'],
        unique : true,
        lowercase : true
    },
    password : {
        type :String,
        required :[true,'Please enter an PassWord'],
        min : [8,'Minimum password length is 6 characters'],
    },
    phone : {
        type : String
    },
    address: {
        type : String
    },
    picture : {
        type : String
    }
})


UserSchema.statics.login = async(email , password ) => {
    try {
            const user = await User.findOne({email});
            if (user) {
                const auth = await bcrypt.compare(password , user.password);
                if (auth) {
                    console.log(user,"use")
                    return {user}
                }
                throw Error('incorrect Password');
            }
            throw Error('incorrect Email');

    }catch (err) {
        const errour = auth.HandlError(err);
        console.log(err)
        return {err  : errour}
    }
}

UserSchema.statics.register = async(fullName , email , password , phone ,address , picture  ) => {
    try{

            const salt = await bcrypt.genSalt();
            let passwordHash = null;
            if (password.length > 8) {
                 passwordHash = await bcrypt.hash(password , salt);
           } else {
               throw Error("password min length")
           } 
            const user = await User.create({
                fullName : fullName,
                email : email ,
                password : passwordHash,
                phone,
                address , 
                picture
            });
            return {user}
    }catch(err) {
        const errour = auth.HandlError(err);
        console.log(err)
        return {err  : errour}
    }
}

const User = mongoose.model("client" , UserSchema)
module.exports = User ;