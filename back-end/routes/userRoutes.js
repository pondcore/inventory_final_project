const express = require('express');
const router = express.Router()

const userController = require('../controller/userControllers');

//@desc GET all user from mongo
//@route GET /api/user
//@access Public
router.get('/', userController.index)


//@desc GET a user by id from mongo
//@route GET /api/user/:id
//@access Public
router.get('/:id', userController.show)

//@desc POST with user data to create
//@route POST /api/user
//@access Public
router.post('/', userController.store)

//@desc PUT with user data to update
//@route PUT /api/user/:id
//@access Public
router.put('/:id', userController.update)

//@desc POST with user data to update
//@route POST /api/user/:id
//@access Public
router.delete('/:id', userController.destroy)

module.exports = router;
