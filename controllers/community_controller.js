const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Community = require('../models/communities');

// @desc Get all communities
// @route GET /community
// @access Public
const getCommunities = asyncHandler(async (req, res) => {
    const communities = await Community.find({});
    res.json(communities);
});

// @desc Get a community
// @route GET /community/:id
// @access Public
const getCommunity = asyncHandler(async (req, res) => {
    const community = await Community.findById(req.params.id);
    if (community) {
        res.json(community);
    } else {
        res.status(404);
        throw new Error('Community not found');
    }
});

// @desc Create a community
// @route POST /community
// @access Public
const createCommunity = asyncHandler(async (req, res) => {
    const { name, street, city, state, pincode } = req.body;
    const createdCommunity = await Community.create({
        name,
        address : {
            street,
            city,
            state,
            pincode
        }
    });
    res.status(201).json(createdCommunity);
});

// @desc Delete a community
// @route DELETE /community/:id
// @access Public
const deleteCommunity = asyncHandler(async (req, res) => {
    const community = await Community.findById(req.params.id);
    if (community) {
        await Community.findByIdAndDelete(req.params.id);
        res.json({ message: 'Community removed' });
    } else {
        res.status(404);
        throw new Error('Community not found');
    }
});

module.exports = { getCommunities, getCommunity, createCommunity, deleteCommunity };