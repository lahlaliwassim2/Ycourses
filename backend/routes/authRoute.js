const router = require('express').Router()

const { registerUserCtrl, loginUserCtrl } = require('../controllers/authControllers')

// api/auth/register
router.post('/register', registerUserCtrl)
router.post('/login', loginUserCtrl)
module.exports= router 
