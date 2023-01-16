const asyncHandler = require('express-async-handler')
const  bcrypt = require('bcryptjs')
const {User , validateRegisterUser, validateLoginUser} = require('../models/User')
const mailer = require("../middlewares/mailer");


module.exports.registerUserCtrl = asyncHandler(async(req,res) => {
    const { error} = validateRegisterUser(req.body)
    if(error) return res.status(400).json({msg:error.details[0].message})
 
    let user = await User.findOne({email : req.body.email})
    if(user) return res.status(400).json({msg:"User already exist"})

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    user = new User({
        username : req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    await user.save()
    if(!user) return res.status(400).json({msg : "error d enristremet"})
    else{
        mailer.main("Register", user);
        res.status(200).json(user)
    }
    // send a response to clien
})


module.exports.loginUserCtrl = asyncHandler(async(req,res)=> {
    const { error} = validateLoginUser(req.body)
    if(error) return res.status(400).json({msg:error.details[0].message})
    const user = await User.findOne({email : req.body.email})
    if(!user) return res.status(400).json({msg : "invalid User email"})
    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password)
    if(!isPasswordMatch) return res.status(400).json({msg : "invalid password "})
    const token = user.generateAuthToken()
    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
    })
    
    // generate Token 
})