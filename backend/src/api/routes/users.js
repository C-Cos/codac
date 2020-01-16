const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

//REGISTER
router.post('/users/register', (request, response) => {
    userController.createUser(request, response);    
})

//LOGIN
router.post('/users/login', (request, response) => {
    userController.authUser(request, response);    
});

//FIND ALL USERS
router.get('/users/findAllUsers', (request, response) => {
    userController.getUser(request, response);
})

//DELETE A USER
router.delete('/users/:id', (request, response) => {
    userController.deleteUser(request, response);
}); 

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

// 



module.exports = router;