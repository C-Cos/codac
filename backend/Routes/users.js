const express = require('express');
const router = express.Router();
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
user = require('../Models/user');

process.env.SECRET_KEY = 'secret';

//REGISTER
router.post('/users/register', (request, response) => {
    //console.log(request.body);
    
    let username = request.body.name
    let email = request.body.email
    let password = request.body.password
    let association = request.body.association
    let postcode = request.body.zipcode
    let city = request.body.city

    let salt = 'pepper'

    /// create hash password
    const hash = crypto.createHash('sha1');
    let pass_hash = hash.update(salt+password, 'utf-8');
    gen_hash= pass_hash.digest('hex');

    //////// Insert params into mongo ///////////
    var newUser = new user({
        username:username,
        email:email,
        password:gen_hash,
        creation_date: new Date(),
        edition_date: new Date(),
        admin:false,
        association: association,
        postcode: postcode,
        city: city
        });

    newUser.save((err)=> {
        if(err){
            console.log(err);
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
    let email = request.body.email;
    let password = request.body.password;
    let salt = 'pepper';
    /// create login hash password
    const hash = crypto.createHash('sha1');
    let pass_hash = hash.update(salt+password, 'utf-8');
    check_hash= pass_hash.digest('hex');

    user.findOne({email:email}, function(err, user){
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
            if(user.password != check_hash){
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

// //FIND ALL USERS
// router.get('/users/findAllUsers', (request, response) => {
//     user.find( function(err, users){
//         console.log(users);
//         if(err) console.log(err);
//         else{
//             response.status(200).json(users);
//         }    
//     });
// })

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