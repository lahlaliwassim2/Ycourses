const asyncHandler = require('express-async-handler')
const { User } = require('../models/User')
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