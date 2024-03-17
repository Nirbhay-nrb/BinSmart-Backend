const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Complaint', complaintSchema);
