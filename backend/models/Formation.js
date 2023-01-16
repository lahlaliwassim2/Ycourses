const mongoose = require('mongoose')
const Joi = require('joi')
const { string } = require('joi')

//Formation Schema 

const FormationSchema = new mongoose.Schema({
    title: {
        type: string,
        required: true,
        trim: true,
        minlenght:2,
        maxlenght: 200
    },
    description: {
        type: string,
        required: true,
        trim: true,
        minlenght:10,
        maxlenght: 200
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    organisation:{
        type: string,
        required:true
    },
    image: {
        type:Object,
        default: {
            url:"",
            publicId: null
        }
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{
    timestamps:true
});

//Formation Model 

const Formation = mongoose.model("Formation",FormationSchema)

//Validation Creat Formation 
function ValidateCreatFormation(obj) {
    const schema = Joi.Object({
        title:Joi.string().trim().min(2).max(200).required(),
        description: Joi.string().trim().min(10).max(200).required(),
        organisation: Joi.string().trim().required()
    });
    return schema.validate(obj)
    
}

//Validation Update Formation 
function ValidateUpdateFormation(obj) {
    const schema = Joi.Object({
        title:Joi.string().trim().min(2).max(200),
        description: Joi.string().trim().min(10).max(200),
        organisation: Joi.string().trim()
    });
    return schema.validate(obj)
    
}
module.exports={
Formation,
ValidateCreatFormation,
ValidateUpdateFormation
}
