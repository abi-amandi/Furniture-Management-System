const express = require('express');
const router = express.Router();
const Quotation = require('../../models/supply/quatationmodel');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// Get all quotations
router.get('/', async (req, res) => {
    try {
        const quotations = await Quotation.find({});
        res.json({ success: true, data: quotations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create a new quotation
router.post('/create_quotation', upload.array('furniture_images', 20), async (req, res) => {
    try {
        const { files } = req;
        const filenames = files.map(file => (file.filename))
        const newQuotation = new Quotation({ ...req.body, furniture_images: [...filenames] });
        await newQuotation.save();
        res.status(201).json({ success: true, message: "Quotation created successfully", data: newQuotation });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Delete a quotation by ID
router.delete('/delete_quotation/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedQuotation = await Quotation.findByIdAndDelete(id);
        if (!deletedQuotation) {
            return res.status(404).json({ success: false, message: "Quotation not found" });
        }
        res.json({ success: true, message: "Quotation deleted successfully", data: deletedQuotation });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
