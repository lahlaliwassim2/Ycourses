const mongoose = require('mongoose')

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

module.exports={
    User
}