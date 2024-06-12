const mongoose = require('mongoose')

const RiderSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    nic: {
        type: Number,
        require: true
    },
    insurance: {
        type: String,
        require: true
    },
    license: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "rider"
    }
})

module.exports = mongoose.model('Rider', RiderSchema)