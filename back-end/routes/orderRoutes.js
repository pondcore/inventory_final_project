const express = require('express');
const router = express.Router()

const orderController = require('../controller/orderControllers');

//@desc GET all user from mongo
//@route GET /api/user
//@access Public
router.get('/', orderController.index)


//@desc GET a user by id from mongo
//@route GET /api/user/:id
//@access Public
router.get('/:id', orderController.show)

//@desc POST with user data to create
//@route POST /api/user
//@access Public
router.post('/', orderController.store)

//@desc PUT with user data to update
//@route PUT /api/user/:id
//@access Public
router.put('/:id', orderController.update)

//@desc POST with user data to update
//@route POST /api/user/:id
//@access Public
router.delete('/:id', orderController.destroy)

module.exports = router;
