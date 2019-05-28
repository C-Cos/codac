const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let event = new Schema({

    creator_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    start_at: {
        type: Date,
        required: true
    },
    end_at: {
        type: Date,
        required: true
    },
    need_help: {
        type: Boolean,
        required: true
    },
    need_players: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('event', event);