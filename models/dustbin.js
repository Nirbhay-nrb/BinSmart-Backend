const mongoose = require('mongoose');

const dustbinSchema = new mongoose.Schema({
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    location: {
        type: {
            building: String,
            floor: String,
            room: String,
            description: String
        },
        required: true
    },
    lastCleanedDate: {
        type: String,
        required: true
    },
    lastCleanedTime: {
        type: String,
        required: true
    },
    filledStatus: {
        type: Number,
        enum: [50, 75, 100],
        required: true
    }
});

module.exports = mongoose.model('Dustbin', dustbinSchema);
