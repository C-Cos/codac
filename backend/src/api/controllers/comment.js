import logger from '../../logger';
const comment = require('../../database/models/comments');


exports.getComments = async (request, response) => {
    // Request all comment linked to an Event id
    let param = request.query.idEvent;
    comment.find({idEvent: param})
            .sort({created_date: -1})
            .exec(function(err, comments){
        if(err) {
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Sorry, cannot retrieve comments."
            });
        }
        else{
            response.status(200).json(comments);
        }    
    })
}

exports.addComment = async (request, response) => {
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
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Error adding comment."
            });
        }
        else {
            response.status(200).json(newDoc)
        }
    }); 
}

exports.editComment = async (request, response) => {
    // Request : id of the comment to update
    //  New content to insert in field description
    var query = { _id: request.body.data.id };
    var update = {description: request.body.data.description};
    comment.findOneAndUpdate(query, update, function(err, comment){
        if(err){
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Error editing comment."
            });
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful"
            }));
        }
    }); 
}

exports.deleteComment = async (request, response) => {
    //Request : Id of the comment to delete
    let param = request.body.id;
    comment.findByIdAndRemove(param, function(err){
        if(err){
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Error deleting comments."
            });
        }
        else {
            response.status(200).send(JSON.stringify({
                message: "Successful"
            }));
        }
    }); 
}