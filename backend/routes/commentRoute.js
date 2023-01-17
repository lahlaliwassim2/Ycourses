const { createCommentCtrl } = require('../controllers/commentCtrl');
const { verifyToken } = require('../middlewares/verifyToken');

const router = require('express').Router()

// /api/comment
router.route("/").post(verifyToken,createCommentCtrl)

module.exports = router;