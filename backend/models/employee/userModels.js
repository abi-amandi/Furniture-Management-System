const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    nic: {
        type: String,
        required: [true, "NIC is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    joinDate: {
        type: String,
        required: [true, "Join date is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    phoneno: {
        type: String,
        required: [true, "Phone number is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isManager: {
        type: Boolean,
        default: false
    },
    notification: {
        type: Array,
        default: []
    },
    seennotification: {
        type: Array,
        default: []
    },
    salary: {
        type: Number, // Assuming salary is a numeric value
        required: true,
    }
});

// Create a model named 'usermanager' based on the updated userSchema
const usermanager = mongoose.model('usermanager', userSchema);

module.exports = usermanager;
