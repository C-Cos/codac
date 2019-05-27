const express = require('express');
const router = express.Router();
category = require('../Models/category');

process.env.SECRET_KEY = 'secret';

router.get('category/findAll', (request, response) => {
    category.find( function(err, category){
        console.log(users);
        if(err) console.log(err);
        else{
            response.status(200).json(category);
        }    
    });
})