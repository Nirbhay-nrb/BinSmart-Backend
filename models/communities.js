const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    }
});

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
    managers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager'
    }],
    cleaners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cleaner'
    }],
    dustbins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dustbin'
    }],
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint'
    }]
});

module.exports = mongoose.model('Community', communitySchema);