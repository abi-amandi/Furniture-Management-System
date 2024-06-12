const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    warehouse_id: {
        type: String,
        required: true,
        unique: true
    },
    warehouse_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model("Warehouse", orderSchema);

module.exports = OrderModel;
