const asyncHandler = require('express-async-handler')
const { User, validateUpdateUser } = require('../models/User')
const bcrypt = require('bcryptjs')
const path = require("path")
const fs = require('fs')
const {cloudinaryUploadImage , cloudinaryRemoveImage} = require('../utils/cloundinary')
/**-------------------------------------
* @desc---- Get All User Profil
* @route --- /api/users/profil
* @methode - Get
* @acces ---- private(only admin )
---------------------------------------*/

module.exports.getAllUsers = asyncHandler(async(req,res) =>{
    const users =await  User.find().select("-password")
    res.status(200).json(users)
})

/**-------------------------------------
* @desc---- Get  User Profil
* @route --- /api/users/profil/:id
* @methode - Get
* @acces ---- public
---------------------------------------*/

module.exports.getUser = asyncHandler(async(req,res) =>{
    const user =await  User.findById(req.params.id).select("-password")
    if(!user) return res.status(404).json({msg: "user not found"})
    res.status(200).json(user)
})


/**-------------------------------------
* @desc---- Update profil User
* @route --- /api/users/profil/:id
* @methode - PUT
* @acces ---- private(only user himself)
---------------------------------------*/
module.exports.updateUserProfilCtrl = asyncHandler(async(req,res)=>{
    const {error} = validateUpdateUser(req.body)
    if(error) {
        return res.status(400).json({msg: error.details[0].message})
    }
    if(req.body.password) {
        const salt = bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    }, { new : true}).select("-password");

    res.status(200).json(updateUser);
});


/**-------------------------------------
* @desc---- Get Users Cont
* @route --- /api/users/cont
* @methode - Get
* @acces ---- private(only admin )
---------------------------------------*/

module.exports.getUsersCountCtrl = asyncHandler(async(req,res) =>{
    const count = await  User.count()
    res.status(200).json(count)
});

/**-------------------------------------
* @desc---- Profil Photo upload
* @route --- /api/users/profile/profile-photo-upload
* @methode - Get
* @acces  private (only admin )
---------------------------------------*/
module.exports.profilePhotoUploadCtrl = asyncHandler(async(req,res)=>{
    //1 VALIDATION
    if(!req.file){
      return res.status(400).json({msg : 'no file provided'})  
    }
    //2 GET  THE PATH TO THE IMAGE
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    //3 Upload to cloundinary
    const result = await cloudinaryUploadImage(imagePath)
    // console.log(result)
    //4 GET the User from DB
    const user = await User.findById(req.user.id);
    //5 Delete The old profile photo if exist
    if(user.profilePhoto.publicId !== null){
        await cloudinaryRemoveImage(user.profilePhoto.publicId)
    }
    //6 change the profilphoto field in the db 
    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id,
    }
    await user.save();

    //7 Send response to client
    res.status(200).json({
        msg: "your photo upload seccesfuly",  
        profilePhoto: {url: result.secure_url, publicId:result.public_id}
    })
    //8 Remove image from the server
    fs.unlinkSync(imagePath);
})

/**-------------------------------------
* @desc----DELETE PROFILE
* @route --- /api/users/delete/:id
* @methode - DELETE
* @acces  private (only admin or UserHimSelf)
---------------------------------------*/
module.exports.deleteUserProfilCtrl = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({msg: "user not found"})

    // Delete the picture from cloundinary
    await cloudinaryRemoveImage(user.profilePhoto.publicId)
    //Delete the user himself 
    await User.findByIdAndDelete(req.params.id)
    //Send a response to the client
    res.status(200).json({message : "Your profil is deleted"})
})
