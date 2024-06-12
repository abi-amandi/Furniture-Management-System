const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema({
  customerId: { type: Number, required: true },
  customerName: { type: String, required: true },
  registerNo: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  productName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  complaint: { type: String, required: true },
  desireResolution: { type: String, required: true },
  acceptStatus: { type: String },

});

const Service = mongoose.model("Service", serviceTypeSchema);

module.exports = Service;


