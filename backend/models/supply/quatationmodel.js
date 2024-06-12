const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    quotation_company_name: {
        type: String,
        required: true
    },
    quotation_company_email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    company_description: {
        type: String,
        required: true
    },
    furniture_types: {
        type: String,
        required: true
    },
    furniture_images: [{
        type: String
    }]
}, {
    timestamps: true
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
