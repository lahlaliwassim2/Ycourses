const router = require('express').Router()
const { getAllUsers, getUser, updateUserProfilCtrl, getUsersCountCtrl, profilePhotoUploadCtrl } = require('../controllers/usersControllers')
const { verifyToken,verifyTokenAndAdmin ,verifyTokenAndOnlyUser} = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')
const photoUpload = require('../middlewares/photoUpload')
// api/users/profile
router.get('/profil',verifyTokenAndAdmin,getAllUsers)
// api/users/profile/:id
router.route("/profile/:id")
        .get(validateObjectId,getUser)
        .put(validateObjectId,verifyTokenAndAdmin,updateUserProfilCtrl)
// /api/users/profile/profile-photo-upload
router.route('/profile/profile-photo-upload')
      .post(verifyToken ,photoUpload.single("image") ,profilePhotoUploadCtrl)
        // Count Users
router.get('/count',verifyTokenAndAdmin,getUsersCountCtrl)
//

module.exports = router