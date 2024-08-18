const express = require('express');
const router = express.Router();

const { getQueries, getQuery, updateQuery, deleteQuery, createQuery } = require('../controllers/queryController.js')

//post a new
router.post('/',createQuery);

//get all 
router.get('/',getQueries);

//get single
router.get('/:id',getQuery);

//delete 
router.delete('/:id',deleteQuery)

module.exports = router