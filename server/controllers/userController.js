const UserModel = require('../models/userModel');

// Get user profile by ID
const getUserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id).select('-userPassword'); // Exclude the password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ user, success: true });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

//get all the users 

const getUsers = async (req, res) => {
    const getUsers = await UserModel.find({}).sort({ createdAt: -1 })
    res.status(200).json(getUsers)
}

// Update user profile by ID
const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { userName, userEmail, userPhone, userDOB, userAddress } = req.body;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Update the user's information
        user.userName = userName || user.userName;
        user.userEmail = userEmail || user.userEmail;
        user.userPhone = userPhone || user.userPhone;
        user.userDOB = userDOB || user.userDOB;
        user.userAddress = userAddress || user.userAddress;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', success: true, user });
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

//delete a Property
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Data" })
    }

    const user = await UserModel.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: "No such Data" })
    }
    res.status(200).json(user)
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser
};
