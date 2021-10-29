const express = require('express');
const router = express.Router()

const customerController = require('../controller/customerControllers');

//@desc GET all customer from mongo
//@route GET /api/customer
//@access Public
router.get('/', customerController.index)


//@desc GET a customer by id from mongo
//@route GET /api/customer/:id
//@access Public
router.get('/:id', customerController.show)

//@desc POST with customer data to create
//@route POST /api/customer
//@access Public
router.post('/', customerController.store)

//@desc PUT with customer data to update
//@route PUT /api/customer/:id
//@access Public
router.put('/:id', customerController.update)

//@desc POST with customer data to update
//@route POST /api/customer/:id
//@access Public
router.delete('/:id', customerController.destroy)

module.exports = router;
