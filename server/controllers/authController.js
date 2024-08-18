const UserModel = require('../models/userModel');
const AdminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//--------------------------------------------------------------------------------------------------------------------------------------
// signup user

const signupUser = async (req, res) => {
    const { userName, userEmail, userPassword, userDOB, userAddress, userPhone } = req.body;

    try {
        const user = await UserModel.findOne({ userEmail });
        if (user) {
            return res.status(409).json({ message: 'User already exists, you can login', success: false });
        }
        const hashedUserPassword = await bcrypt.hash(userPassword, 10);
        const newUser = new UserModel({
            userName,
            userEmail,
            userPassword: hashedUserPassword,
            userPhone,
            userDOB,
            userAddress
        });

        await newUser.save();

        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// login user 
const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const user = await UserModel.findOne({ userEmail });
        if (!user) {
            return res.status(409).json({ message: 'User not registered', success: false });
        }
        const isPassword = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPassword) {
            return res.status(403).json({ message: 'Incorrect password', success: false });
        }
        const jwtToken = jwt.sign(
            { userEmail: user.userEmail, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({ message: 'Login successful', success: true, jwtToken, userEmail, userName: user.userName, propHolder_ID: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

//------------------------------------------------------------------------------------------------------------------------------------------------------

// signup admin

const adminSignup = async (req, res) => {
    const { adminName, adminEmail, adminPassword, adminDOB } = req.body;

    try {
        const admin = await AdminModel.findOne({ adminEmail });
        if (admin) {
            return res.status(409).json({ message: 'Admin already exists, you can login', success: false });
        }
        const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
        const newAdmin = new AdminModel({
            adminName,
            adminEmail,
            adminPassword: hashedAdminPassword,
            adminDOB
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// login admin 
const adminLogin = async (req, res) => {
    try {
        const { adminEmail, adminPassword } = req.body;
        const admin = await AdminModel.findOne({ adminEmail });
        if (!admin) {
            return res.status(409).json({ message: 'Admin not registered', success: false });
        }
        const isPassword = await bcrypt.compare(adminPassword, admin.adminPassword);
        if (!isPassword) {
            return res.status(403).json({ message: 'Incorrect password', success: false });
        }
        const jwtToken = jwt.sign(
            { adminEmail: admin.adminEmail, _id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({ message: 'Login successful', success: true, jwtToken, adminEmail, adminName: admin.adminName });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

//--------------------------------------------------------------------------------------------------------------

module.exports = {
    signupUser,
    loginUser,
    adminLogin,
    adminSignup
};
