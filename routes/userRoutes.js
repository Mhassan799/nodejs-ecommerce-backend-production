const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/forgetPassword', userController.forgetPassword)
router.post('/reset-password', userController.resetPassword)



module.exports = router;