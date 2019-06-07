const express = require('express');
const router = express.Router();
const comment = require('../Models/comments');

process.env.SECRET_KEY = 'secret';


//ADD A COMMENT
router.post('/comment', (request, response) => {
    let idEvent = request.body.idEvent
    let username = request.body.username
    let description = request.body.description

    //Request : id of Event which the comment is linked to
    // name of user that post the comment
    // content of the comment
    // created date
    // edited date
    var newComment = new comment({
        idEvent: idEvent,
        username: username,
        description: description,
        created_date: new Date(),
        edited_date: new Date()
        });

    //Save new comment in DB and send to front
    newComment.save((err, newDoc)=> {
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error adding comment"
            }));
        }
        else {
            response.status(200).json(newDoc)
        }
    }); 
})



//EDIT COMMENT
router.put('/comment', (request, response) => {
    // Request : id of the comment to update
    //  New content to insert in field description
    var query = { _id: request.body.data.id };
    var update = {description: request.body.data.description};
    comment.findOneAndUpdate(query, update, function(err, comment){
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error editing comment"
            }));
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful"
            }));
        }
    }); 
})

//DELETE COMMENT
router.delete('/comment', (request, response) => {
    //Request : Id of the comment to delete
    let param = request.body.id;
    comment.findByIdAndRemove(param, function(err){
        if(err){
            console.log(err);
            response.status(400).send(JSON.stringify({
                message: "Error deleting comment"
            }));
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful"
            }));
        }
    }); 
})

//GET ALL COMMENTS
router.get('/comment', (request, response) => {
    // Request all comment linked to an Event id
    let param = request.query.idEvent;
    comment.find({idEvent: param})
            .sort({created_date: -1})
            .exec(function(err, comments){
        if(err) console.log(err);
        else{
            response.status(200).json(comments);
        }    
    })
});

module.exports = router;