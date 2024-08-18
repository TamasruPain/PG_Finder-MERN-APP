const express = require('express');

const { getUserProfile, updateUserProfile, getUsers, deleteUser } = require('../controllers/userController')


const router = express.Router()


// Get user profile by ID
router.get('/profile/:id', getUserProfile);

// Update user profile by ID
router.patch('/profile/:id', updateUserProfile);

//get all the users 
router.get('/users',getUsers)

router.delete('/users/:id', deleteUser)

module.exports = router;
