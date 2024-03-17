const mongoose = require('mongoose');

const cleanerSchema = new mongoose.Schema({
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
    },
    assignedDustbins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dustbin'
    }]
});

module.exports = mongoose.model('Cleaner', cleanerSchema);
