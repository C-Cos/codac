const express = require('express');
const router = express.Router();
const controllerComment = require ("../controllers/comment");


//ADD A COMMENT
router.post('/comment', (request, response) => {
    controllerComment.addComment(request, response);
})

//EDIT COMMENT
router.put('/comment', (request, response) => {
    controllerComment.editComment(request, response);   
})

//DELETE COMMENT
router.delete('/comment', (request, response) => {
    controllerComment.deleteComment(request, response);
})

//GET ALL COMMENTS
router.get('/comment', (request, response) => {
    controllerComment.getComments(request, response);  
});

module.exports = router;