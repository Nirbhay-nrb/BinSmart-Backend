const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateOfComplaint: {
        type: String,
        required: true
    },
    timeOfComplaint: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dustbinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dustbin'
    }
});

module.exports = mongoose.model('Complaint', complaintSchema);
