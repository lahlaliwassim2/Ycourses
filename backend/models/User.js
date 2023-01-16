const mongoose = require('mongoose')
const Joi = require('joi')
//User schema 

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        trim:true,
        minlenght: 5, 
        maxlenght: 100
    },
    email : {
        type: String,
        required: true,
        trim:true,
        minlenght: 5, 
        maxlenght: 100,
        unique: true
    },
    password : {
        type: String,
        required: true,
        trim:true,
        minlenght: 5, 
    },
    profilePhoto:{
        type: Object,
        default: {
            url:"https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png",
            publicId: null
        }
    },
    bio : {
        type: String
    },
    isAdmin : {
        type: Boolean,
        default : false
    },
    isAccontVerified : {
        type: Boolean,
        default : false
    }
     
    

},{
    timestamps: true
});

// User Model 
const User = mongoose.model("User",UserSchema);


//Validation Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(200).required(),
        email: Joi.string().trim().min(5).max(200).required().email(),
        password: Joi.string().trim().min(8).max(200).required(),
});
return schema.validate(obj);
}

module.exports={
    User,
    validateRegisterUser
}