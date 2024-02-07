const express = require('express')
const router = express.Router()
const categoryController = require('../controller/categoryController')
const { verifyToken, IsAdmin } = require('../midllware/jwt')
// create category
router.post('/create',verifyToken,IsAdmin, categoryController.create);
// update category
router.put('/update-category/:id',verifyToken,IsAdmin,categoryController.updateCategory);
// delete category

router.delete('/delete-category/:id',verifyToken,IsAdmin,categoryController.deleteCategory);

// get categories

router.get('/get',categoryController.getAllCategories);

// get single category

router.get('/get-single/:id',categoryController.getSingleCategory)
module.exports = router;