 const fs = require('fs')
 const path = require('path')
 const asyncHandler = require('express-async-handler')
 const { Formation, ValidateCreatFormation } = require('../models/Formation')
 const {cloudinaryUploadImage} = require("../utils/cloundinary")


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