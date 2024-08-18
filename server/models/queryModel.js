const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const querySchema = new Schema({

    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerNumber: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerQuery: {
        type: String,
        required: true
    },

    propertyID: {
        type: String,
        required: true
    },
    propHolder_ID: {
        type: String,
        required:true
    }

}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);
