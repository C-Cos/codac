import logger from '../../logger';
const event = require('../../database/models/event');
var ObjectId = require('mongodb').ObjectID

exports.getEvent = async (request, response) => {
    event.findById(request.params.id, function(err, event){
        if(err) {
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Sorry, event not found."
            });
        }
        else {
            response.status(200).json(event);
        }
    }); 
}

exports.getEvents = async (request, response) => {
    event.find({})
        .sort({start_date: -1})
        .exec(function(err, events){
        if(err){
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Sorry, cannot retrieve events."
            });
        }
        else {
            response.status(200).send({
                events: events
            });
        }
    }); 
}

exports.addEvent = async (request, response) => {
    let image;

    // Handle image upload. If field if null, set a default image
    if(request.files !== undefined || request.files !== null){
        request.files.file.mv('./public/images/'+request.files.file.name)
        .then(res => {
            logger.debug('Upload successful !');
        })
        .catch(err => {
            logger.error('🔥 error: %o', err.message);
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
    newEvent.save((err)=> {
        if(err){
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Event error registration."
            });
        }
        else {
            response.status(200).send({
                message: "Successful"
            });
        }
    }); 
}

exports.editEvent = async (request, response) => {
    let image;

    if(request.files!==null){
        request.files.file.mv('./public/images/'+request.files.file.name)
        .then(res => {
            logger.debug('Upload successful !');
        })
        .catch(err => {
            logger.error('🔥 error: %o', err.message);
        });
        image= "/images/"+request.files.file.name;
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
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Event error editing."
            });
        }
        else {
            response.status(200).send({
                message: "Successful",
                event: event
            });
        }
    }); 
}

exports.deleteEvent = async (request, response) => {
    event.findByIdAndRemove(request.params.id, function(err){
        if(err){
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Event deletion error."
            });
        }
        else {
            response.status(200).send({
                message: "Successful"
            });
        }
    })   
}