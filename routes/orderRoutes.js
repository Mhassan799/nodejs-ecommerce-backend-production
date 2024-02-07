const express = require('express')

const router = express.Router()
const orderController = require('../controller/orderController')
const { verifyToken, IsAdmin } = require('../midllware/jwt')

router.post('/create-order',verifyToken,orderController.placeOrder)
router.get('/get',verifyToken,IsAdmin,orderController.placeOrder)


module.exports=router;