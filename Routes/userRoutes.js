const express = require('express');


const readUser = (req,res) =>{
    res.status(200).json({
        status: 'ok',
        message: 'this method is under construction!'
    });
}

const CreateUser = (req,res) =>{
    res.status(200).json({
        status: 'ok',
        message: 'this method is under construction!'
    });
}


const router = express.Router();

router
    .route('/')
    .get(readUser)
    .post(CreateUser);

module.exports = router;