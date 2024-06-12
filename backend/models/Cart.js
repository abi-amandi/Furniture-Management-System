const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        require: true
    },
    orderItems: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: { type: Number, required: true },
          total: { type: Number, required: true },
        },
    ],
    total: {
        type: Number,
        required: true
    }
     // product: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'Product',
    //     require: true
    // },
})

module.exports = mongoose.model('Cart', cartSchema)