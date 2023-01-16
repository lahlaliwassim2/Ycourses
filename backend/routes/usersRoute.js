const router = require('express').Router()
const { getAllUsers, getUser } = require('../controllers/usersControllers')
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')
// api/users/profile
router.get('/profil',verifyTokenAndAdmin,getAllUsers)
// api/users/profile/:id
router.get('/profil/:id',validateObjectId,getUser)

module.exports = router