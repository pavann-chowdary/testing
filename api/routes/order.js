
import connectToDatabase from '../db.js';
import express from 'express';
import Order from '../models/order.js';
const router = express.Router();


// Optimized /placeOrder endpoint
router.post("/", async (req, res) => {
    console.log("api/src/server.js: /placeOrder endpoint hit");
    try {
        await connectToDatabase();
        const { items, email, orderDate, orderTime } = req.body;

        if (!Array.isArray(items) || !email) {
            console.log("api/src/server.js: Invalid request body");
            return res.status(400).json({ error: "Expected an array of items and an email" });
        }

        const ordersWithEmail = items.map(order => ({
            ...order,
            email: email,
            time: orderTime,
            date: orderDate,
        }));

        const savedOrders = await Order.insertMany(ordersWithEmail);

        res.status(201).json({ message: "Orders saved successfully!", orders: savedOrders });
    } catch (error) {
        console.error("api/src/server.js: Error saving orders:", error);
        console.error("api/src/server.js: Request body:", req.body);
        res.status(500).json({ error: "Failed to save orders" });
    }
});

// Optimized /displayOrder endpoint (with pagination)
router.get("/api/displayOrder", async (req, res) => {
    try {
        await connectToDatabase();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const orders = await Order.find().skip(skip).limit(limit);
        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            orders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error("api/src/server.js: Error fetching orders:", error);
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
});

export default router;