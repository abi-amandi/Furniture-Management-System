const express = require('express');
const router = express.Router();
const SupplierOrder = require('../../models/supply/suppliermodel'); // Assuming your model file path

// Get all 
router.get("/", async (req, res) => {
    try {
        const data = await SupplierOrder.find({});
        res.json({ success: true, data: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Create a new supplier
router.post("/create", async (req, res) => {
    try {
        const data = new SupplierOrder(req.body);
        await data.save();
        res.json({ success: true, message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to create data" });
    }
});

// Update an order by ID
router.put("/update", async (req, res) => {
    try {
        const { id, ...rest } = req.body;
        const data = await SupplierOrder.findByIdAndUpdate(id, rest);
        if (!data) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Data updated successfully", data: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update data" });
    }
});

// Delete an order by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await SupplierOrder.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Data deleted successfully", data: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to delete data" });
    }
});

// Get count of all orders
router.get("/count", async (req, res) => {
    try {
        const users = await SupplierOrder.find({});
        res.status(200).json({ count: users.length, data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch order count" });
    }
});

// Get an order by ID
router.get("/order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await SupplierOrder.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Order fetched successfully", data: order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
