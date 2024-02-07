const express= require('express')
const router = express.Router()
const { verifyToken, IsAdmin } = require('../midllware/jwt')
const productController = require('../controller/productController')

// create product
router.post('/create', verifyToken,IsAdmin,productController.create);

// get product

router.get('/get-single/:productId', productController.getSingleProduct)

//get all products 

router.get('/get',productController.getAllProducts)

// like product

router.post('/like/:id',productController.likeProduct)


// dislike product

router.post('/dislike/:id',productController.dislikeProduct)

// view product

router.post('/views/:id', productController.viewProduct)

// filter product by category color size material

router.get('/filter-product', productController.filterProducts)

// load two produts


router.get('/get-two-product/:page', productController.productList)

// update products

router.put('/update-product/:id', verifyToken,IsAdmin,productController.UpdateProduct)

// delete products

router.delete('/delete-product/:id', verifyToken,IsAdmin,productController.deleteProduct)

// search product
router.get('/search',productController.productSearch)

module.exports = router;