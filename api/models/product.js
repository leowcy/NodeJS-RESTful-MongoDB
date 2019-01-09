//Created the definition of Schema and added rules on it
const mongoose = require('mongoose');

/*
    Set name and price as required. 
    Either of them missed, the request won't process.
    And there will be Error message.
    The definition can be changed if necessary.
*/ 
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

//Export as a Module to be called by products.js
module.exports = mongoose.model('Product', productSchema);

