const express = require('express');
const router = express.Router();
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
event = require('../Models/event');

process.env.SECRET_KEY = 'secret';

//ADD AN EVENT
router.post('/events/addevent', (request, response) => {


    var newEvent = new event({
        username: request.body.username,
        name: request.body.name,
        desc: request.body.desc,
        category: request.body.sport,
        address: request.body.address,
        zipcode: request.body.zipcode,
        city: request.body.city,
        start_time: request.body.startHr,
        end_time: request.body.endHr,
        start_date: request.body.startDate,
        end_date: request.body.endDate
        // need_help: request.body.help,
        // need_players: request.body.participants
        });

    newEvent.save((err)=> {
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error event registration"
            }));
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful"
            }));
        }
    }); 
})

router.get('/events/findAll', (request, response) => {
    event.find( function(err, events){
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Get events failed"
            }));
        }
        else{
            response.status(200).json(events);
        }    
    });
})

module.exports = router;