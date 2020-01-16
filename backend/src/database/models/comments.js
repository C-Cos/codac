const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let comment = new Schema({
    idEvent:{
        type: String
    },
    username:{
        type: String
    },
    description:{
        type: String
    },
    created_date: {
        type: Date,
        required: true
    },
    edited_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('comment', comment, 'comment');