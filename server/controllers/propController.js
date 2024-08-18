const Property = require('../models/propModel')
const mongoose = require('mongoose')


//Create Property
const createProperty = async (req, res) => {
    const { title, details, address, gmapLink, state, city, price, availability, pgType, propHolder, propHolderPhoneNum, propImage, propHolder_ID } = req.body;
    try {
        const property = await Property.create({
            title, details, address, gmapLink, state, city, price, availability, pgType, propHolder, propHolderPhoneNum, propImage, propHolder_ID
        });
        res.status(200).json(property);
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
};

//get all Property
const getProperties = async (req, res) => {
    const properties = await Property.find({}).sort({ createdAt: -1 })
    res.status(200).json(properties)
}


//get a single Property
const getProperty = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Data" })
    }

    const property = await Property.findById(id)

    if (!property) {
        return res.status(404).json({ error: "No such Data" })
    }

    res.status(200).json(property)
}


//update a Property
const updateProperty = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Data ' })
    }

    const property = await Property.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!property) {
        return res.status(404).json({ error: "No such Data" })
    }
    res.status(200).json(property)
}


//delete a Property
const deleteProperty = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Data" })
    }

    const property = await Property.findOneAndDelete({ _id: id })

    if (!property) {
        return res.status(404).json({ error: "No such Data" })
    }
    res.status(200).json(property)
}

// Get unique cities
const getCities = async (req, res) => {
    try {
        const cities = await Property.distinct("city");
        res.status(200).json(cities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get unique states
const getStates = async (req, res) => {
    try {
        const states = await Property.distinct("state");
        res.status(200).json(states);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get unique prices
const getPrices = async (req, res) => {
    try {
        const prices = await Property.distinct("price");
        res.status(200).json(prices);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createProperty,
    getProperties,
    getProperty,
    deleteProperty,
    updateProperty,
    getCities,
    getStates,
    getPrices
};
