const express = require('express');
const router = express.Router()

const productController = require('../controller/productControllers');

//@desc GET all product from mongo
//@route GET /api/product
//@access Public
router.get('/', productController.index)


//@desc GET a product by id from mongo
//@route GET /api/product/:id
//@access Public
router.get('/:id', productController.show)

//@desc POST with product data to create
//@route POST /api/product
//@access Public
router.post('/', productController.store)

//@desc PUT with product data to update
//@route PUT /api/product/:id
//@access Public
router.put('/:id', productController.update)

//@desc POST with product data to update
//@route POST /api/product/:id
//@access Public
router.delete('/:id', productController.destroy)

module.exports = router;
