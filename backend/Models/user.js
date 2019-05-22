const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: [/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}/,"Invalid email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    creation_date: {
        type: Date,
        required: true
    },
    edition_date: {
        type: Date,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    association: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('user', user, 'user');