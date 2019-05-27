let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name:{
        type: String,
    }
});

const category = module.exports = mongoose.model('category', categorySchema);

