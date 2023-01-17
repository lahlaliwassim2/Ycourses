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


/**-------------------------------------
* @desc----Get all  Comments
* @route --- /api/comment
* @methode - GET
* @acces  private (only admin)
---------------------------------------*/
module.exports.gettCommentCtrl = asyncHandler(async(req,res)=>{
   const comments = await Comment.find().populate("user")
res.status(200).json(comments)
})

/**-------------------------------------
* @desc----Delete Comment
* @route --- /api/comment/:id
* @methode - DELETE
* @acces  private (only admin or owner the comment)
---------------------------------------*/
module.exports.deleteCommentCtrl = asyncHandler(async(req,res)=>{
    const comment = await Comment.findById(req.params.id)
    if(!comment) res.status(404).json({msg:"comment not found"})
    if(req.user.isAdmin || req.user.id === comment.user.toString()) {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "comment has been deleted"})
    }else{
        res.status(400).json({msg: "acces denied , not allowd"})
    }
 res.status(200).json(comments)
 })

 /**-------------------------------------
* @desc----Update Comment
* @route --- /api/comment/id
* @methode - PUT
* @acces  private (only loged User)
---------------------------------------*/
module.exports.updateCommentCtrl = asyncHandler(async(req,res)=>{
    //Validation 
    const {error} = validateUpdateComment(req.body)
    if(error) res.status(400).json({msg: error.details[0].message})
    
    const comment = await Comment.findById(req.params.id)
    if(!comment) return res.status(404).json({msg : "Comment not found"})
    if(req.user.id !== comment.user.toString()) return res.status(404).json({msg : "acces denied , only User himself can edit his comment"})

    const updateComment = await Comment.findByIdAndUpdate(req.params.id,{
        $set : {
            text: req.body.text,
        }
    },{new:true})
    res.status(200).json(updateComment)
})