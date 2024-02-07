const express = require('express')
const router = express.Router()
const { verifyToken } = require('../midllware/jwt')
const promoController = require('../controller/promoController')
router.post('/create',verifyToken,promoController.promoCode)
router.post('/add-users/:promoCode',promoController.addUsers)
router.put('/promo-update/:promoId',promoController.promoUpdate)
router.delete('/promo-delete/:promoId',promoController.promoDelete)




module.exports = router;