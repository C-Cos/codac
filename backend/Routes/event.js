const express = require('express');
const router = express.Router();
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
event = require('../Models/event');
var ObjectId = require('mongodb').ObjectID

process.env.SECRET_KEY = 'secret';

//ADD AN EVENT
router.post('/events/addevent',(request, response) => {

    let image;
    // Handle image upload. If field if null, set a default image
    if(request.files !== undefined || request.files !== null){
        request.files.file.mv('./public/images/'+request.files.file.name)
        .then(res => {
            console.log("Upload successfull");
        })
        .catch(err => {
            console.log("Upload failed");
        });
        image= "http://localhost:4242/images/"+request.files.file.name;
    }
    else {
        image="https://images.unsplash.com/photo-1557766131-dca3a8acae87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80";
    }
    
    // DB insertion of the new event
    var newEvent = new event({
        username: request.body.username,
        name: request.body.name,
        desc: request.body.desc,
        category: request.body.sport,
        image: image,
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
        console.log(newEvent);
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
router.put('/event/:id', (request, response) => {
    let image;

    if(request.files!==null){
        request.files.file.mv('./public/images/'+request.files.file.name)
        .then(res => {
            console.log("Upload successfull");
        })
        .catch(err => {
            console.log("Upload failed");
        });
        image= "http://localhost:4242/images/"+request.files.file.name;
    }
    else {
        image=request.body.image;
    }
    
    const updatedEvent = {
        username: request.body.username,
        name: request.body.name,
        desc: request.body.desc,
        category: request.body.sport,
        image: image,
        // address: request.body.address,
        // zipcode: request.body.zipcode,
        // city: request.body.city,
        start_time: request.body.startHr,
        end_time: request.body.endHr,
        start_date: request.body.startDate,
        end_date: request.body.endDate
        // need_help: request.body.help,
        // need_players: request.body.participants
        };
        
        let id = new ObjectId(request.params.id);

    event.updateOne({_id:id}, updatedEvent, function(err, event){
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error event registration"
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
router.delete('/event/:id', (request, response) => {
    event.findByIdAndRemove(request.params.id, function(err){
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

//GET ALL EVENTS
router.get('/events/findAll', (request, response) => {
    event.find({})
        .sort({start_date: -1})
        .exec(function(err, events){
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

//GET AN EVENT
router.get('/event/:id', (request, response) => {
    event.findById(request.params.id, function(err, event){
        if(err) {
            response.status(400).send(JSON.stringify({
                message: 'Oops, Something went wrong.'
                }));
                console.log(err)
        }
        else {
            response.status(200).json(event);
        }
    }); 
});

module.exports = router;