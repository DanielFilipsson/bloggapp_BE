const User = require("../models/user.model");
const { comparePasswords, generateToken } = require('../utils/auth');

//Function to create User:
async function registerUser(req, res){
    const _user = req.body;
    try {
        await User.create(_user)
        res.json({
            message: "User has registered"
        })
    } catch(error) {
        console.error(error);  
        res.status(500).json({
            message: "User was not registered",
            error: error.message  
        });
    }
};

//Function for login:
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken({ userId: user._id });
        res.json({
            message: "User has logged in successfully",
            token,
            userId: user._id  
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

//Function to get one user:
async function getUser(req, res) {
    const userId = req.params.id; 
    try {
        const getOneUser = await User.findById(userId);
        if (getOneUser) {
            res.json(getOneUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

//Function to get all users:
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
        } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

//function to delete a user:
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const result = await User.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    registerUser,
    getAllUsers,
    getUser,
    deleteUser,
    loginUser,

}

