const { createCommentCtrl, gettCommentCtrl, deleteCommentCtrl } = require('../controllers/commentCtrl');
const validateObjectId = require('../middlewares/validateObjectId');
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = require('express').Router()

// /api/comment
router.route("/")
    .post(verifyToken,createCommentCtrl)
    .get(verifyTokenAndAdmin,gettCommentCtrl)
// /api/comment/:is
router.route("/:id").delete(validateObjectId,verifyToken,deleteCommentCtrl)
module.exports = router;