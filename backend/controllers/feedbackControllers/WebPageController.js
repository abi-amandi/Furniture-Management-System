const WebPage = require("../../models/feedback/WebPageModel");

exports.getAllWebPage = async (req, res) => {
  try {
    const webpages = await WebPage.find();
    res.json(webpages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWebPageById = async (req, res) => {
  try {
    const webpage = await WebPage.findById(req.params.id);
    if (!webpage) {
      return res.status(404).json({ message: "webpage not found" });
    }
    res.json(webpage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createwebpage = async (req, res) => {
  try {
    const {
      customerId,
      name,
      email,
      mobile,
      address,
      date,
      time,
      url,
      acceptStatus
     
    } = req.body;

    // Check if all required fields are provided
    if (
      !customerId ||
      !name ||
      !email ||
      !mobile ||
      !address ||
      !date ||
      !time||
      !url ||
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

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const webpage = new WebPage({
      customerId,
      name,
      email,
      mobile,
      address,
      date,
      time,
      url,
      acceptStatus: false 
    });
    await webpage.save();
    res.status(201).json({ message: " created successfully", webpage });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};





//update

exports.updatewebpage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
     
      name,
      email,
      mobile,
      address,
      date,
      time,
      url,
      acceptStatus
    } = req.body;

    // Validate all fields are provided
    if (
      
      !name ||
      !email ||
      !mobile ||
      !address ||
      !date ||
      !time||
      !url ||
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

    const updatedwebpage = await WebPage.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        address,
        date,
        time,
        url,
        acceptStatus
      },
      { new: true }
    );
    if (!updatedwebpage) {
      return res.status(404).json({ message: "webpage not found" });
    }
    res.json({
      message: " updated successfully",
      webpage: updatedwebpage,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletewebpage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedwebpage = await WebPage.findByIdAndDelete(id);
    if (!deletedwebpage) {
      return res.status(404).json({ message: "webpage not found" });
    }
    res.json({ message: " deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All photographs

exports.getwebpageByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const webpages = await WebPage.find({ customerId });
    if (webpages.length === 0) {
      return res.status(404).json({
        message: "No webpages found for the provided customer ID",
      });
    }
    res.json(webpages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.getAllWebPageStatus = async (req, res) => {
  try {
    const webpages = await WebPage.find({ acceptStatus: "true" });
    if (webpages.length === 0) {
      return res.status(404).json({ error: "No data found with acceptStatus true" });
    }
    res.json(webpages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Functions

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
