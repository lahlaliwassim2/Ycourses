const mongoose = require('mongoose')
const Joi = require('joi')

const OrganisationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    title: {
        type: String,
        required:true,
        trim:true
    },
  
},{
    timestamps: true
});

//Organisation Model 
const Organisation = mongoose.model("Organisation", OrganisationSchema)

//Validate Create Organisation 
function validateCreateOrganisation(obj) {
    const Schema = Joi.object({
        title: Joi.string().required()
    })
    return Schema.validate(obj)
}

module.exports = {
    Organisation,
    validateCreateOrganisation
}