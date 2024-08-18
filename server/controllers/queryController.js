const Query = require('../models/queryModel')
const mongoose = require('mongoose')


//Create 
const createQuery = async (req, res) => {
    const { customerName, customerEmail, customerNumber, customerAddress, customerQuery, propertyID, propHolder_ID } = req.body;
    try {
        const query = await Query.create({
            customerName, customerEmail, customerNumber, customerAddress, customerQuery, propertyID, propHolder_ID
        });
        res.status(200).json(query);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all 
const getQueries = async (req, res) => {
    const queries = await Query.find({}).sort({ createdAt: -1 })
    res.status(200).json(queries)
}


//get a single 
const getQuery = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Data" })
    }

    const query = await Query.findById(id)

    if (!query) {
        return res.status(404).json({ error: "No such Data" })
    }

    res.status(200).json(query)
}


//delete 
const deleteQuery = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Data" })
    }

    const query = await Query.findOneAndDelete({ _id: id })

    if (!query) {
        return res.status(404).json({ error: "No such Data" })
    }
    res.status(200).json(query)
}


module.exports = {
    createQuery,
    getQueries,
    getQuery,
    deleteQuery,
};
