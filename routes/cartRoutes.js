const express = require('express')
const router = express.Router()

const cartController = require('../controller/cartController')
const { verifyToken } = require('../midllware/jwt')

router.post('/addToCart/:productId',verifyToken, cartController.addToCart)
router.post('/removeFromCart/:productId',verifyToken, cartController.removeFromCart)
router.delete('/removeProduct/:productId', cartController.removeProduct)
router.get('/get-cart', verifyToken,cartController.getcartOfUser)




module.exports=router