const router = require('express').Router()
const { getAllUsers, getUser, updateUserProfilCtrl, getUsersCountCtrl } = require('../controllers/usersControllers')
const { verifyTokenAndAdmin ,verifyTokenAndOnlyUser} = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')
// api/users/profile
router.get('/profil',verifyTokenAndAdmin,getAllUsers)
// api/users/profile/:id
router.route("/profile/:id")
        .get(validateObjectId,getUser)
        .put(validateObjectId,verifyTokenAndAdmin,updateUserProfilCtrl)
// Count Users
router.get('/count',verifyTokenAndAdmin,getUsersCountCtrl)
module.exports = router