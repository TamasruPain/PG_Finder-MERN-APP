const express = require('express')
const router = express.Router();

const {
    createProperty,
    getProperties,
    getProperty,
    deleteProperty,
    updateProperty,
    getCities,
    getStates,
    getPrices
} = require('../controllers/propController');

// const ensureAuthenticated = require('../middleware/Auth');

//POST a new Property
router.post('/',createProperty);

//GET all Properties
router.get('/', getProperties);

//GET a single Property
router.get('/:id', getProperty);

//DELETE a Property
router.delete('/:id', deleteProperty);

//UPDATE a Property
router.patch('/:id', updateProperty);

//FilterSearch Data
router.get('/cities', getCities);
router.get('/states', getStates);
router.get('/prices', getPrices);

module.exports = router