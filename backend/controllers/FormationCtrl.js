 const fs = require('fs')
 const path = require('path')
 const asyncHandler = require('express-async-handler')
 const { Formation, ValidateCreatFormation,ValidateUpdateFormation } = require('../models/Formation')
 const {cloudinaryUploadImage, cloudinaryRemoveImage} = require("../utils/cloundinary")
const { post } = require('../routes/formationRoute')


 /**-------------------------------------
* @desc----Create new Formation
* @route --- /api/formation
* @methode - POST
* @acces  private (only admin)
---------------------------------------*/

module.exports.createFormation = asyncHandler(async(req,res) =>{
    // 1 Validation for image
    if(!req.file) {
        return res.status(404).json({msg: "no image provided"})
    }
    //2 validation for data 
    const {error} = ValidateCreatFormation(req.body)
    if(error) res.status(400).json({message : error.details[0].message})
    //3 Upload photo 
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath)
    //4 create new post and saved to db 
    const formation = await Formation.create({
        title: req.body.title,
        description: req.body.description,
        organisation: req.body.organisation,
        user: req.user.id,
        image: {
            url: result.secure_url,
            publicId: result.public_id,
        }
    })
    //5 send response to the client 
    res.status(201).json(formation)
    // 6 remove image from the server
    fs.unlinkSync(imagePath);
})

 /**-------------------------------------
* @desc----Get Formation
* @route --- /api/formation
* @methode - GET
* @acces  public
---------------------------------------*/
module.exports.getAllFormationCtrl = asyncHandler(async(req,res)=>{
    const POST_PER_PAGE = 3
    const {pageNumber,organisation} = req.query;
    let formations;

    if(pageNumber) {
        formations = await Formation.find()
                    .skip((pageNumber - 1)*POST_PER_PAGE)
                    .limit(POST_PER_PAGE)
                    .sort({ createdAt: -1})
                    .populate("user",["-password"])
    } else if(organisation) {
        formations = await Formation.find({organisation})
        .sort({ createdAt: -1})
        .populate("user",["-password"])
    }else {
        formations = await Formation.find()
        .sort({ createdAt: -1})
        .populate("user",["-password"])
    }
    res.status(200).json(formations)
})

 /**-------------------------------------
* @desc----Get single Formation
* @route --- /api/formation/:id
* @methode - GET
* @acces  public
---------------------------------------*/
module.exports.getSingleFormationCtrl = asyncHandler(async(req,res)=>{
    const formation = await Formation.findById(req.params.id).populate("user",["-password"])
    if(!formation) res.status(404).json({msg : "formation not found"})
    res.status(200).json(formation)
})


 /**-------------------------------------
* @desc----Count Formation
* @route --- /api/formation/count
* @methode - GET
* @acces  public
---------------------------------------*/
module.exports.getCountFormationCtrl = asyncHandler(async(req,res)=>{
    const count = await Formation.count(req.params.id)
    res.status(200).json(count)
})

 /**-------------------------------------
* @desc----Delete Formation
* @route --- /api/formation/:id
* @methode - DELETE
* @acces  private(only admin or user create post)
---------------------------------------*/
module.exports.deleteFormationCtrl = asyncHandler(async(req,res)=>{
    const formation = await Formation.findById(req.params.id)
    if(!formation) res.status(404).json({msg : "formation not found"})
    if(req.user.isAdmin || req.user.id === formation.user.toString()){
        await Formation.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(formation.image.publicId);
        // @todo  delete All cmnt 
        res.status(200).json({msg : "formation deleted",postId:formation._id})
    } else{
        res.status(403).json({msg : "acces denied "})
    }

})

 /**-------------------------------------
* @desc----Update Formation
* @route --- /api/formation/:id
* @methode - PUT
* @acces  private(only admin or user create post)
---------------------------------------*/
module.exports.updateFormationCtrl = asyncHandler(async(req,res)=>{
    // 1 validation 
    const {error} = ValidateUpdateFormation(req.body) 
    if(error) res.status(400).json({msg: error.details[o].message})
    //2 Get the formations from db and chek this formation exist
    const formation = await Formation.findById(req.params.id)
    if(!formation) {
        return res.status(400).json({msg:"formation not found"})
    }
    //3 Chek if this formation belong to logged in user
    if(req.user.id !== formation.user.toString()){
        return res.status(403).json({msg:"acces denied"})
    }
    //4 Update Formation
    const updatedFormation = await Formation.findByIdAndUpdate(req.params.id,{
        $set: {
            title: req.body.title,
            description: req.body.description,
            organisation: req.body.organisation
        }
    }, { new:true }).populate("user",["-password"])
    //5 Sen msg TO THE client
    res.status(200).json(updatedFormation)
})


 /**-------------------------------------
* @desc----Update Image Formation
* @route --- /api/formation/upload-image/:id
* @methode - PUT
* @acces  private(only admin or user create post)
---------------------------------------*/
module.exports.updateFormationCtrl = asyncHandler(async(req,res)=>{
    // 1 validation 

    if(!req.file) res.status(400).json({msg: "nom image provided"})
    //2 Get the formations from db and chek this formation exist
    const formation = await Formation.findById(req.params.id)
    if(!formation) {
        return res.status(400).json({msg:"formation not found"}) 
    }
    //3 Chek if this formation belong to logged in user
    if(req.user.id !== formation.user.toString()){
        return res.status(403).json({msg:"acces denied"})
    }
    //4 Update the old  Image 
    await cloudinaryRemoveImage(formation.image.publicId)
    //5 Upload new photo 
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await cloudinaryUploadImage(imagePath)
    //6 Update photo in the DB 
    const updatedFormation = await Formation.findByIdAndUpdate(req.params.id,{
        $set: {
           image:{
            url : result.secure_url,
            publicId:result.public_id
           }
        }
    }, { new:true }).populate("user",["-password"])
    //7 Send response to clieNt
    res.status(200).json(updatedFormation)
    //8  REMOVE IMAGE FROM THE SERVER 
    fs.unlinkSync(imagePath)
})