const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    }
});

module.exports = mongoose.model('Manager', managerSchema);
