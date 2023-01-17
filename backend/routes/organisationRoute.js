const router = require('express').Router()
const { createOrganisationCtrl, getAllOrganisationCtrl, deleteOganisationCtrl } = require('../controllers/OrganisationCtrl')
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken')
const validateObjectId= require('../middlewares/validateObjectId')
// /api/organisation
router.route("/")
        .post(verifyTokenAndAdmin,createOrganisationCtrl)
        .get(getAllOrganisationCtrl)

router.route("/:id")
    .delete(validateObjectId,verifyTokenAndAdmin,deleteOganisationCtrl)

module.exports = router