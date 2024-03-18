const asyncHandler = require('express-async-handler');
const Dustbin = require('../models/dustbin');
const Cleaner = require('../models/cleaner');

// @desc Get all dustbins
// @route GET /dustbin
// @access Private
const getAllDustbins = asyncHandler(async (req, res) => {
    const dustbins = await Dustbin.find({});
    res.json(dustbins);
});

// @desc create a dustbin (just the ID and it will be returned for QR generation, rest of the things are to be updated afterwards)
// @route POST /dustbin
// @access Private
const createDustbin = asyncHandler(async (req, res) => {
    const createdDustbin = await Dustbin.create({
        filledStatus: 50,
    });
    res.status(201).json(createdDustbin._id);
});


// @desc Get a dustbin
// @route GET /dustbin/:id
// @access Private
const getDustbin = asyncHandler(async (req, res) => {
    const dustbin = await Dustbin.findById(req.params.id);
    if (dustbin) {
        res.json(dustbin);
    } else {
        res.status(404);
        throw new Error('Dustbin not found');
    }
});

// @desc Delete a dustbin
// @route DELETE /dustbin/:id
// @access Private
const deleteDustbin = asyncHandler(async (req, res) => {
    const dustbin = await Dustbin.findById(req.params.id);
    if (dustbin) {
        await Dustbin.findByIdAndDelete(req.params.id);
        res.json({ message: 'Dustbin removed' });
    }
    else {
        res.status(404);
        throw new Error('Dustbin not found');
    }
}
);

// @desc Update a dustbin
// @route POST /dustbin/:id
// @access Private
const updateDustbin = asyncHandler(async (req, res) => {
    const dustbin = await Dustbin.findById(req.params.id);
    if (dustbin) {
        const { filledStatus, lastCleanedDate, lastCleanedTime, location, communityId, cleanerId } = req.body;
        dustbin.filledStatus = filledStatus;
        dustbin.lastCleanedDate = lastCleanedDate;
        dustbin.lastCleanedTime = lastCleanedTime;
        dustbin.location = location;
        dustbin.communityId = communityId;
        dustbin.cleanerId = cleanerId;
        const updatedDustbin = await dustbin.save();
        res.json(updatedDustbin);
    }
    else {
        res.status(404);
        throw new Error('Dustbin not found');
    }
}
);

// @desc Get all dustbins by community
// @route GET /dustbin/community/:id
// @access Private
const getDustbinsByCommunity = asyncHandler(async (req, res) => {
    const dustbins = await Dustbin.find({ communityId: req.params.id });
    res.json(dustbins);
});

// @desc Get all dustbins for cleaner
// @route GET /dustbin/cleaner/:id
// @access Private
const getDustbinsForCleaner = asyncHandler(async (req, res) => {
    const dustbins = await Dustbin.find({ cleanerId: req.params.id });
    res.json(dustbins);
});

// @desc Assign a dustbin to a cleaner
// @route POST /dustbin/assign/:id
// @access Private
const assignDustbin = asyncHandler(async (req, res) => {
    const dustbin = await Dustbin.findById(req.params.id);
    if (dustbin) {
        const cleaner = await Cleaner.findById(req.body.cleanerId);
        if (cleaner) {
            dustbin.cleanerId = cleaner._id;
            const updatedDustbin = await dustbin.save();
            res.json(updatedDustbin);
        } else {
            res.status(404);
            throw new Error('Cleaner not found');
        }
    }
    else {
        res.status(404);
        throw new Error('Dustbin not found');
    }
});

// @desc Unassign a dustbin from a cleaner
// @route POST /dustbin/unassign/:id
// @access Private
const unassignDustbin = asyncHandler(async (req, res) => {
    const dustbin = await Dustbin.findById(req.params.id);
    if (dustbin) {
        dustbin.cleanerId = null;
        const updatedDustbin = await dustbin.save();
        res.json(updatedDustbin);
    }
    else {
        res.status(404);
        throw new Error('Dustbin not found');
    }
});

module.exports = { getAllDustbins, createDustbin, getDustbin, deleteDustbin, updateDustbin, getDustbinsByCommunity, getDustbinsForCleaner, assignDustbin, unassignDustbin };