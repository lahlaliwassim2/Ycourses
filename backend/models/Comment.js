const mongoose = require('mongoose')
const Joi = require('joi')

const CommentSchema = new mongoose.Schema({
    formationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Formation",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    text: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
},{
    timestamps: true
});

//Comment Model 
const Comment = mongoose.model("Comment",CommentSchema)

//Validate Create Comment 
function validateCreateComment(obj) {
    const Schema = Joi.object({
        formationId : Joi.string().required(),
        text: Joi.string().required()
    })
    return Schema.validate(obj)
}
//Validate Update Comment 
function validateUpdateComment(obj) {
    const Schema = Joi.object({
        text: Joi.string()
    })
    return Schema.validate(obj)
}
module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment
}