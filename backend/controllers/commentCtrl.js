const asyncHandler = require('express-async-handler')
const {Comment,validateCreateComment,validateUpdateComment} = require('../models/Comment')
const {User} = require('../models/User')
/**-------------------------------------
* @desc----Create new Comment
* @route --- /api/comment
* @methode - POST
* @acces  private (only loged User)
---------------------------------------*/
module.exports.createCommentCtrl = asyncHandler(async(req,res)=>{
    const {error} = validateCreateComment(req.body)
    if(error) res.status(400).json({msg: error.details[0].message})
    
    const profile = await User.findById(req.user.id)

    const comment = await Comment.create({
        formationId: req.body.formationId,
        text: req.body.text,
        user: req.user.id,
        username:profile.username,

    })
res.status(201).json(comment)
})


