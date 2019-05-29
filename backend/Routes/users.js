const express = require('express');
const router = express.Router();
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
// user = require('../Models/user');
const hashPassword = require('../Functions/usersfunctions.js');
const createUser = require('../Functions/usersfunctions.js');
const verifyPassword = require('../Functions/usersfunctions.js');

process.env.SECRET_KEY = 'secret';

//REGISTER
router.post('/users/register', (request, response) => {
    
    var newUser=createUser(request.body.name,request.body.email,request.body.password,request.body.association,request.body.zipcode,request.body.city);

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
                message: "Cet utilisateur n'existe pas"
            }));
        }
        else
        {
            if(!verifyPassword(request.body.password,user.password)){
                response.status(401).send(JSON.stringify({
                    message: "Le mot de passe ne correspond pas"
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

// //FIND USER BY EMAIL
// router.get('/users/findUsers', (request, response) => {
//     let param = request.query.email;
//     console.log(param);
//     //param= "fabien.oren@coding.com";
//     user.find({ email:  param }, function(err, users){
//         console.log(users);
//         if(users.length===0) {
//             response.status(204).send('No result found');
//         }
//         else{
//             response.status(200).json(users);
//         }    
//     });
// })

// //FIND USER BY ID
// router.get('/users/findOneByIdCreator', (request, response) => {
//     let param = {_id: request.query.id};
//     //console.log(param);
//     user.findById(param , function(err, user){
//         //console.log(users);
//         if(err) console.log(err);
//         else{
//             response.json(user);
//         }    
//     });
// })



// //EDIT USER
// router.post('/users/edit', (request, response) => {
//     /// create hash password
//     const hash = crypto.createHash('sha1');
//     let pass_hash = hash.update(request.body.password, 'utf-8');
//     gen_hash= pass_hash.digest('hex');

//     var query = { _id: request.body.id };
//     var update = { 
//         login: request.body.name,
//         email: request.body.email,
//         password: gen_hash
//     };
//     //////// Insert params into mongo ///////////
//     user.findOneAndUpdate(query, update, {new: true}, function(err, user){
//         console.log(user);
//         if(err) 
//         {   
//             response.send(JSON.stringify({
//             message: 'Oops, Something went wrong.'
//             }));
//             console.log(err)
//         }

//         else {
//             const payload = {
//                 _id: user._id,
//                 login: user.login,
//                 email: user.email
//             }
//             let token = jwt.sign(payload, process.env.SECRET_KEY, {
//                 expiresIn:1440
//             })
//             response.send(JSON.stringify({
//             message: 'Successful',
//             token: token,
//             editName: user.login
//             }));
//         }
//     }); 
// })

// //DELETE USER
// router.delete('/users/delete', (request, response) => {
//     let param = request.query.id;
//     //var query = { _id: request.body.id };
//     //console.log(query);
//     //////// Insert params into mongo ///////////
//     user.findByIdAndRemove(param, function(err){
//         if(err) 
//         {   
//             response.send(JSON.stringify({
//             message: 'Oops, Something went wrong. We cannot delete your account.'
//             }));
//             console.log(err)
//         }

//         else {
//             response.send(JSON.stringify({
//             message: 'Successful'
//             }));
//         }
//     }); 
// })



module.exports = router;