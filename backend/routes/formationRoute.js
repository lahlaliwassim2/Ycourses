const router = require('express').Router()
const { createFormation, getAllFormationCtrl } = require('../controllers/FormationCtrl')
const photoUpload = require('../middlewares/photoUpload')
const {verifyToken, verifyTokenAndAdmin} = require('../middlewares/verifyToken')

//api/formation
router.route('/')
      .post(verifyTokenAndAdmin,photoUpload.single("image"),createFormation)
      .get(getAllFormationCtrl)
module.exports = router