const express = require('express');
const router = express.Router();
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
user = require('../Models/event');

process.env.SECRET_KEY = 'secret';

//ADD AN EVENT
router.post('/events/addevent', (request, response) => {
    let title = request.body.title
    let description = request.body.description
    let category = request.body.category
    let address = request.body.address
    let zipcode = request.body.zipcode
    let city = request.body.city
    let start_at = request.body.start_at
    let end_at = request.body.end_at
    let need_help = request.body.help
    let need_players = request.body.need_players


    var newEvent = new event({
        creator_name:username,
        title:title,
        description:description,
        category: category,
        address: address,
        zipcode:zipcode,
        city: city,
        start_at: start_at,
        end_at: end_at,
        need_help: need_help,
        need_players: need_players
        });

    newEvent.save((err)=> {
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



module.exports = router;