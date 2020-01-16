const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let event = new Schema({

    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    zipcode: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('event', event, 'event');