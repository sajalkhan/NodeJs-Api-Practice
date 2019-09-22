const express = require('express');
const userController = require('./../Controller/userController');
const router = express.Router();

router
    .route('/')
    .get(userController.readUser)
    .post(userController.createUser);

module.exports = router;