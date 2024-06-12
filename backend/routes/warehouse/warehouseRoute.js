const express = require('express');
const router = express.Router();
const OrderModel = require('../../models/warehouse/warehouseModel'); 

// GET all orders
router.get("/", async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// POST create a new order
router.post("/create", async (req, res) => {
    try {
        const newOrder = new OrderModel(req.body);
        await newOrder.save();
        res.status(201).json({ success: true, message: "Data created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create data" });
    }
});

// PUT update an existing order
router.put("/update/:id", async (req, res) => {
    const orderId = req.params.id;
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Updated successfully", data: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update order" });
    }
});

// DELETE an order by ID
router.delete("/delete/:id", async (req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Deleted successfully", data: deletedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete order" });
    }
});

// GET count of orders
router.get("/count", async (req, res) => {
    try {
        const count = await OrderModel.countDocuments({});
        res.status(200).json({ success: true, count: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch order count" });
    }
});

// GET an order by ID
router.get("/user/:id", async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Order fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch order" });
    }
});

module.exports = router;
