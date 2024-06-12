const Service = require("../../models/feedback/ServiceModel");

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "service not found" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.createService = async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      registerNo,
      mobile,
      email,
      productName,
      address1,
      address2,
      date,
      time,
      complaint,
      desireResolution,
      acceptStatus // Remove this from destructuring
    } = req.body;

    // Check if all required fields are provided
    if (
      !customerId ||
      !customerName ||
      !registerNo ||
      !email ||
      !mobile ||
      !productName ||
      !address1 ||
      !address2 ||
      !date ||
      !time ||
      !complaint ||
      !desireResolution
      // Removed !acceptStatus from the check as we'll set it to false by default
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Create the service with acceptStatus set to false by default
    const service = new Service({
      customerId,
      customerName,
      registerNo,
      mobile,
      email,
      productName,
      address1,
      address2,
      date,
      time,
      complaint,
      desireResolution,
      acceptStatus: false // Set acceptStatus to false by default
    });

    // Save the service to the database
    await service.save();

    // Return success response
    res.status(201).json({ message: "Service created successfully", service });
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};


//update

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
customerName,
registerNo,
mobile,
email,
productName,
address1,
address2 ,
date ,
time,
complaint,
desireResolution,
acceptStatus
    } = req.body;

    // Validate all fields are provided
    if (
      !customerName ||
      !registerNo ||
      !email ||
      !mobile ||
      !productName ||
      !address1 ||
      !address2 ||
      !date ||
      !time||
      !complaint ||
      !desireResolution ||
      !acceptStatus
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const updatedservice = await Service.findByIdAndUpdate(
      id,
      {
        customerName,
registerNo,
mobile,
email,
productName,
address1,
address2 ,
date ,
time,
complaint,
desireResolution,
acceptStatus
      },
      { new: true }
    );
    if (!updatedservice) {
      return res.status(404).json({ message: "service not found" });
    }
    res.json({
      message: "service updated successfully",
      service: updatedservice,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedservice = await Service.findByIdAndDelete(id);
    if (!deletedservice) {
      return res.status(404).json({ message: "service not found" });
    }
    res.json({ message: "service deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All service

exports.getServicesByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const services = await Service.find({ customerId });
    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for the provided customer ID" });
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};












exports.getAllServicesStatus = async (req, res) => {
  try {
    const services = await Service.find({ acceptStatus: "true" });
    if (services.length === 0) {
      return res.status(404).json({ error: "No data found with acceptStatus true" });
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// Functions

function isValidEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
