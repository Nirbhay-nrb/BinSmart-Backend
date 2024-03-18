const asyncHandler = require('express-async-handler');
const Complaint = require('../models/complaint');

// @desc Get all complaints
// @route GET /complaint
// @access Private
const getComplaints = asyncHandler(async (req, res) => {
    const complaints = await Complaint.find({});
    res.json(complaints);
});

// @desc create a complaint
// @route POST /complaint
// @access Private
const createComplaint = asyncHandler(async (req, res) => {
    const { title, description, userId, communityId, dateOfComplaint, timeOfComplaint , dustbinId} = req.body;
    const createdComplaint = await Complaint.create({
        title,
        description,
        userId,
        communityId,
        status : 'pending',
        dateOfComplaint,
        timeOfComplaint,
        dustbinId
    });
    res.status(201).json(createdComplaint);
}
);

// @desc Get all complaints by user
// @route GET /complaint/user/:id
// @access Private
const getComplaintsByUser = asyncHandler(async (req, res) => {
    const complaints = await Complaint.find({ userId: req.params.id });
    res.json(complaints);
});

// @desc Get a complaint
// @route GET /complaint/:id
// @access Private
const getComplaint = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
        res.json(complaint);
    } else {
        res.status(404);
        throw new Error('Complaint not found');
    }
});

// @desc Delete a complaint
// @route DELETE /complaint/:id
// @access Private
const deleteComplaint = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
        await Complaint.findByIdAndDelete(req.params.id);
        res.json({ message: 'Complaint removed' });
    }
    else {
        res.status(404);
        throw new Error('Complaint not found');
    }
});

// @desc Update a complaint
// @route POST /complaint/:id
// @access Private
const updateComplaint = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
        const { title, description, status } = req.body;
        complaint.title = title;
        complaint.description = description;
        complaint.status = status;
        const updatedComplaint = await complaint.save();
        res.json(updatedComplaint);
    } else {
        res.status(404);
        throw new Error('Complaint not found');
    }
});

module.exports = { getComplaints, createComplaint, getComplaintsByUser, getComplaint, deleteComplaint, updateComplaint };