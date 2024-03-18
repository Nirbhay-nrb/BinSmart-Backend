const mongoose = require('mongoose');

const dustbinSchema = new mongoose.Schema({
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },
    location: {
        type: {
            building: String,
            floor: String,
            room: String,
            description: String
        }
    },
    lastCleanedDate: {
        type: String
    },
    lastCleanedTime: {
        type: String
    },
    filledStatus: {
        type: Number,
        enum: [50, 75, 100],
        required: true
    },
    cleanerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cleaner'
    }
});

module.exports = mongoose.model('Dustbin', dustbinSchema);
