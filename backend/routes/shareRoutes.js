const express = require("express");
const Share = require("../models/Share");

const router = express.Router();

// Fetch all shares
router.get("/", async (req, res) => {
    try {
        const shares = await Share.find();
        res.json(shares);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buy shares
router.post("/buy", async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        const newShare = new Share({ name, price, quantity });
        const savedShare = await newShare.save();

        res.status(200).json(savedShare);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Sell shares
router.post("/sell", async (req, res) => {
    try {
        const { id, quantity } = req.body;

        const share = await Share.findById(id);
        if (!share) return res.status(404).json({ error: "Share not found" });

        if (share.quantity < quantity) {
            return res.status(400).json({ error: "Not enough shares to sell" });
        }

        share.quantity -= quantity;
        const updatedShare = await share.save();

        res.status(200).json(updatedShare);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
