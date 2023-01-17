const router = require('express').Router()
const { createFormation, getAllFormationCtrl, getSingleFormationCtrl, getCountFormationCtrl, deleteFormationCtrl, updateFormationCtrl, updateFormationImageCtrl } = require('../controllers/FormationCtrl')
const photoUpload = require('../middlewares/photoUpload')
const {verifyToken, verifyTokenAndAdmin} = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')
//api/formation
router.route('/')
      .post(verifyTokenAndAdmin,photoUpload.single("image"),createFormation)
      .get(getAllFormationCtrl)

//api/formation/count
router.route('/count').get(getCountFormationCtrl)
//api/formation/:id
router.route('/:id')
      .get(validateObjectId,getSingleFormationCtrl)
      .delete(validateObjectId,verifyToken,deleteFormationCtrl)   
      .put(validateObjectId,verifyToken,updateFormationCtrl)
      
//api/formations/update-image/:id
router.route("/update-image/:id")
      .put(validateObjectId,verifyToken,photoUpload.single("image"),updateFormationImageCtrl)
module.exports = router