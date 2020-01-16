const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/category");

//Get all the sport category to choose from when adding an event
router.get('/category', (request, response) => {
    categoryController.getCategories(request, response);
})

module.exports = router;