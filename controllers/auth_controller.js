const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Cleaner = require('../models/cleaner');
const Manager = require('../models/manager');
const Resident = require('../models/resident');


// @desc Register a new user
// @route POST /auth/register
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    const { role , name , phoneNumber , email , password , communityId } = req.body;
    // checking for empty fields
    if(!role || !phoneNumber || !email || !password || !name){
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    // checking if email exists already or not
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('User already exists');
    }
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        role,
        phoneNumber,
        email,
        password: hashedPassword
    });
    // creating the user in the respective role collection
    if(role == 'manager'){
        await Manager.create({
            userId: user._id,
            name: name,
            communityId
        });
    }
    else if(role == 'cleaner'){
        await Cleaner.create({
            userId: user._id,
            name: name,
            communityId,
            assignedDustbins: []
        });
    }
    else {
        await Resident.create({
            userId: user._id,
            name: name,
            communityId,
            complaints: []
        });
    }
    // creating a token
    const accessToken = jwt.sign({
        user: {
            email: user.email,
            id: user._id
        },
    }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
    );
    // sending the response
    res.status(200).json({
        accessToken,
        user: {
            name: user.name,
            role: user.role,
            email: user.email,
            phone: user.phone,
            communityId: user.communityId,
            id: user._id
        },
    });
}); 

// @desc Login a user
// @route POST /auth/login
// @access Public
const loginUser = asyncHandler(async (req,res) => {
    const { email , password } = req.body;
    // checking for empty fields
    if(!email || !password){
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    // checking if email exists or not
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error('User does not exist');
    }
    // checking if password is correct or not
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if(!passwordCorrect){
        res.status(400);
        throw new Error('Password is incorrect');
    }
    // creating a token
    const accessToken = jwt.sign({
        user: {
            email: user.email,
            id: user._id
        },
    }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
    );
    // sending the response
    res.status(200).json({
        accessToken,
        user: {
            name: user.name,
            role: user.role,
            email: user.email,
            phone: user.phone,
            communityId: user.communityId,
            id: user._id
        },
    });
});

// @desc Get the user details
// @route GET /auth/user
// @access Private
const getUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(400);
        throw new Error('User does not exist');
    }

    if(user.role == 'manager'){
        const manager = await Manager.findOne({userId: user._id});
        res.status(200).json({
            user: {
                name: manager.name,
                role: user.role,
                email: user.email,
                phoneNumber: user.phoneNumber,
                communityId: manager.communityId,
                id: user._id
            },
        });
    }
    else if(user.role == 'cleaner'){
        const cleaner = await Cleaner.findOne({userId: user._id});
        res.status(200).json({
            user: {
                name: cleaner.name,
                role: user.role,
                email: user.email,
                phoneNumber: user.phoneNumber,
                communityId: cleaner.communityId,
                id: user._id
            },
        });
    }
    else {
        const resident = await Resident.findOne({userId: user._id});
        res.status(200).json({
            user: {
                name: resident.name,
                role: user.role,
                email: user.email,
                phoneNumber: user.phoneNumber,
                id: user._id
            },
        });
    }
});

// @desc change passsword
// @route POST /auth/changepassword
// @access Private
const changePassword = asyncHandler(async (req,res) => {
    const { oldPassword , newPassword } = req.body;
    // checking for empty fields
    if(!oldPassword || !newPassword){
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    // checking if user exists or not
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(400);
        throw new Error('User does not exist');
    }
    // checking if old password is correct or not
    const passwordCorrect = await bcrypt.compare(oldPassword, user.password);
    if(!passwordCorrect){
        res.status(400);
        throw new Error('Old password is incorrect');
    }
    // hashing the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // updating the password
    user.password = hashedPassword;
    // saving the user
    await user.save();
    res.status(200).json({
        message: 'Password changed successfully'
    });
});


module.exports = {registerUser, loginUser, getUser, changePassword};