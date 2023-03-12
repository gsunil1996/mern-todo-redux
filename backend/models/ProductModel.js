const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('product', productSchema);