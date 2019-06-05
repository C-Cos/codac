const express = require('express');
const router = express.Router();
const comment = require('../Models/comments');

process.env.SECRET_KEY = 'secret';

//add comment
router.post('/comment', (request, response) => {
    let idEvent = request.body.idEvent
    let username = request.body.username
    let description = request.body.description

    var newComment = new comment({
        idEvent: idEvent,
        username: username,
        description: description,
        created_date: new Date(),
        edited_date: new Date()
        });

    newComment.save((err, newDoc)=> {
        console.log(newDoc);
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

//edit comment
router.put('/comment', (request, response) => {
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

//delete comment
router.delete('/comment', (request, response) => {
    //console.log(request.body.id);
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

//get comments linked to an event
router.get('/comment', (request, response) => {
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