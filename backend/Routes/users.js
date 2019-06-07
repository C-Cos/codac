const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../Models/user');
const createUser = require('../Functions/usersfunctions.js');
const verifyPassword = require('../Functions/usersfunctions.js');

process.env.SECRET_KEY = 'secret';

//REGISTER
router.post('/users/register', (request, response) => {
    
    let temp = createUser.createUser(
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.association,
        request.body.zipcode,
        request.body.city);

    var newUser = new user(temp);

    newUser.save((err)=> {
        if(err){
            response.status(400).send(JSON.stringify({
                message: "Error registration"
            }));
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful"
            }));
        }
    }); 
})

//LOGIN
router.post('/users/login', (request, response) => {
    user.findOne({email:request.body.email}, function(err, user){
        if (err) {
            response.status(400).send(JSON.stringify({
                message: 'Failed to login.'
            }));
        }
        else if (user === null) 
        {
            response.status(401).send(JSON.stringify({
                message: "User error"
            }));
        }
        else
        {
            if(!verifyPassword.verifyPassword(request.body.password,user.password)){
                response.status(401).send(JSON.stringify({
                    message: "Password error"
                }));
            }
            else{
                const payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn:1440
                })
                response.status(200).send(
                    JSON.stringify({
                        message: 'Successful', 
                        token: token
                }));
            }
        }
    });
});

//FIND ALL USERS
router.get('/users/findAllUsers', (request, response) => {
    user.find( function(err, users){
        //console.log(users);
        if(err) console.log(err);
        else{
            response.status(200).json(users);
        }    
    });
})

//DELETE A USER
router.delete('/users/:id', (request, response) => {
    user.findByIdAndRemove(request.params.id, function(err){
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error deleting user"
            }));
        }
        else {
            console.log(response);
            response.status(200).send(JSON.stringify({
                message: "Successful delete"
            }));
        }
    })
}); 

//FIND USER BY ID
router.get('/users/:id', (request, response) => {
    user.findById(request.params.id , function(err, user){
        if(err) console.log(err);
        else{
            response.json(user);
        }    
    });
})

//EDIT USER
router.put('/users/:id', (request, response) => {

    var update = { 
        username: request.body.name,
        email: request.body.email,
        postcode: request.body.postcode,
        city: request.body.city
    };
    
    user.findOneAndUpdate({_id:request.params.id}, update, {new:true}, function(err, user){
        if(err) 
        {   console.log(err);
            response.status(400).send(JSON.stringify({
            message: 'Oops, Something went wrong.'
            }));
        }

        else {
            response.status(200).send(JSON.stringify({
            message: 'Successful'
            }));
        }
    }); 
})

module.exports = router;