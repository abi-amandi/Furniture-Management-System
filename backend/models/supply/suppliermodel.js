const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    supplier_name: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const SupplierOrder = mongoose.model("SupplierOrder", orderSchema);

module.exports = SupplierOrder;
