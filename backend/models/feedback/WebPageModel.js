const mongoose = require("mongoose");

const webPageSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true }, 
  date: { type: String, required: true },
  time: { type: String, required: true },
  url: { type: String, required: true },
  acceptStatus: { type: String,},
 
});

const WebPage = mongoose.model("WebPage", webPageSchema);

module.exports = WebPage;
