const asyncHandler = require('express-async-handler')
const { User, validateUpdateUser } = require('../models/User')
const bcrypt = require('bcryptjs')
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
    const updateUser = await User.findByIdAndUpdate(req.body.id,{
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    },{ new : true}).select("-password");
    res.status(200).json(updateUser);
})
