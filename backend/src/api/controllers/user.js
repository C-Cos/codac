import logger from '../../logger';
import config from '../../config';

const user = require('../../database/models/user');
const createUser = require('../modules/usersfunctions.js');
const jwt = require('jsonwebtoken');
const verifyPassword = require('../modules/usersfunctions.js');

exports.getUser = async (request, response) => {
    logger.info('getUser method : User found in db');
    user.find( function(err, users){
        if(err) { 
            logger.error('🔥 error: %o', err.message);
            return res.status(500).json({
                error: "Sorry, user not found."
            });
        }
        else{
            response.status(200).json(users);
        }    
    });
}

exports.deleteUser = async (request, response) => {
    logger.info('deleteUser method : User found in db');

    user.findByIdAndRemove(request.params.id, function(err){
        if(err){
            logger.error('🔥 error: %o', err.message);
            return response.status(400).json({
                error: "Error deleting user."
            });
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful delete"
            }));
        }
    })
}

exports.createUser = async (request, response) => {
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
            logger.error('🔥 error: %o', err.message);
            return response.status(400).json({
                error: "Error creating user."
            });
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful"
            }));
        }
    }); 
}

exports.authUser = async (request, response) => {
    user.findOne({email:request.body.email}, function(err, user){
        if (err) {
            logger.error('🔥 error: %o', err.message);
            return response.status(400).json({
                error: "Error authentificating user."
            });
        }
        else if (user === null) 
        {
            logger.error('🔥 error: No user found');
            return response.status(400).json({
                error: "Error user."
            });
        }
        else
        {
            if(!verifyPassword.verifyPassword(request.body.password, user.password)){
                logger.error('🔥 error: Wrong password');
                return response.status(400).json({
                    error: "Password error."
            });
            }
            else{
                const payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
                let token = jwt.sign(payload, config.mySecret, {
                    expiresIn:1440
                })
                response.status(200).send({
                        token: token,
                        user: user
                });
            }
        }
    });
}