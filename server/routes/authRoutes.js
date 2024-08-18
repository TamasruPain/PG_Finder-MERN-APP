const express = require('express');

//controller functions
const { signupUser, loginUser, adminLogin, adminSignup } = require('../controllers/authController')

//middleware functions
const { signupValidation, loginValidation, adminLoginValidation, adminSignupValidation } = require('../middleware/AuthValidation')

const router = express.Router()

//login route
router.post('/login', loginValidation, loginUser)

//signup route
router.post('/signup', signupValidation, signupUser)

//login route
router.post('/adminLogin', adminLoginValidation, adminLogin)

//signup route
router.post('/adminSignup', adminSignupValidation, adminSignup)



module.exports = router;
