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
});


module.exports = mongoose.model('Resident', residentSchema);
