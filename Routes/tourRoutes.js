const express = require('express');
const tourController = require('./../Controller/tourController');

const router = express.Router(); // here i add a middleware

router
.route('/')
.get(tourController.readAllObject)
.post(tourController.createObject);

router
.route('/:id')
.get(tourController.readSingleObject)
.patch(tourController.updateObject)
.delete(tourController.DeleteObject);

module.exports = router; // export the router and we will import it from our main app