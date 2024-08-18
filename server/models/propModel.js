const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gmapLink: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    propHolder: {
        type: String,
        required: true
    },
    propHolderPhoneNum: {
        type: String,
        required: true
    },

    availability: {
        type: String,
        required: true
    },

    pgType: {
        type: String,
        required: true
    },

    propImage: {
        type: String,
    },

    propHolder_ID: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
