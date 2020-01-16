const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');

//ADD AN EVENT
router.post('/events/addevent',(request, response) => {
    eventController.addEvent(request, response);
})

//EDIT AN EVENT
router.put('/event/:id', (request, response) => {
    eventController.editEvent(request, response);
})

//DELETE AN EVENT
router.delete('/event/:id', (request, response) => {
    eventController.deleteEvent(request, response);
}); 

//GET ALL EVENTS
router.get('/events/findAll', (request, response) => {
    eventController.getEvents(request, response);
})

//GET AN EVENT
router.get('/event/:id', (request, response) => {
    eventController.getEvent(response, request);
});

module.exports = router;