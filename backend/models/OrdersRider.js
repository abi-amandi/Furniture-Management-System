const mongoose = require('mongoose')

const OrderRiderSchema = mongoose.Schema({
    rider: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Rider',
        require: true
    },
    order: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        require: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        require: true
    }
})

module.exports = mongoose.model('OrderRider', OrderRiderSchema)