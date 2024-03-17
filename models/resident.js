const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint'
    }]
});


module.exports = mongoose.model('Resident', residentSchema);
