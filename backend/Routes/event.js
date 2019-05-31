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
    var query = { _id: request.body.id };

    var update = {
        title: request.body.title,
        description: request.body.description,
        category: request.body.category,
        address: request.body.address,
        zipcode: request.body.zipcode,
        city: request.body.city,
        start_at: request.body.start_at,
        end_at: request.body.end_at}

    event.findOneAndUpdate(query, update, function(err, event){
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error registration"
            }));
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful",
                event: event
            }));
        }
    }); 
})

//DELETE AN EVENT
router.delete('/events', (request, response) => {
    var query = { _id: request.body.id };
    event.findByIdAndRemove(query, function(err){
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error deleting event"
            }));
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful"
            }));
        }
    })
}); 

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

router.get('/event', (request, response) => {
    let param = request.query.id;
    event.findById(param, function(err, article){
        if(err) 
            {response.send(JSON.stringify({
            message: 'Oops, Something went wrong.'
            }));
            console.log(err)}
        else 
        {
            response.json(article);   
        }
    }); 
});

module.exports = router;