const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    managerId: {
        type: String,
        required: true
    },
    managerInfo: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    appDate: {
        type: String, // Changed to appDate
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
}, { timestamps: true });

const appointmentModel = mongoose.model('appointments', appointmentSchema);
module.exports = appointmentModel;
