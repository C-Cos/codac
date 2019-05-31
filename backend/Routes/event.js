const express = require('express');
const router = express.Router();
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
event = require('../Models/event');

process.env.SECRET_KEY = 'secret';

//ADD AN EVENT
router.post('/events/addevent',(request, response) => {

    console.log(request.files.file);

   request.files.file.mv('../Public/'+request.files.file.name)
   .then(res=>{
       console.log("success "+res)
   })
   .catch(err=>{
       console.log("failed "+err)
   });

    var newEvent = new event({
        username: request.body.username,
        name: request.body.name,
        desc: request.body.desc,
        category: request.body.sport,
        image: request.files.file.name,
        //address: request.body.address,
        //zipcode: request.body.zipcode,
        //city: request.body.city,
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

//EDIT AN EVENT
router.put('/events', (request, response) => {
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

    event.findOneAndUpdate({}, function(err, event){
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
    }) 
})

//DELETE AN EVENT

//GET AN EVENT
router.get('/events', (request, response) => {
    event.find(function(err, events){
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error"
            }));
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful",
                events: events
            }));
        }
    }); 
})



module.exports = router;