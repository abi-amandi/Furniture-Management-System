const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    rider: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Rider'
    },
    license: {
        type: String,
        require: true
    },
    insuarance: {
        type: String,
        require: true
    },
    vehicleNumber: {
        type: String,
        require: true
    },
    currentOrder: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order'
    }
})

module.exports = mongoose.model('DeliveryVehicle', vehicleSchema)