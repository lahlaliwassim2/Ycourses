const router = require('express').Router()
const { getAllUsers, getUser } = require('../controllers/usersControllers')
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken')
// api/users/profile
router.get('/profil',verifyTokenAndAdmin,getAllUsers)
router.get('/profil/:id',getUser)

module.exports = router