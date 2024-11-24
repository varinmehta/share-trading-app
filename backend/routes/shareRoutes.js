const express = require("express");
const Share = require("../models/Share");
const router = express.Router();

// Get all shares
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
    const { name, price, quantity } = req.body;
    try {
        const newShare = new Share({ name, price, quantity });
        const savedShare = await newShare.save();
        res.json(savedShare);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sell shares
router.post("/sell", async (req, res) => {
    const { id, quantity } = req.body;
    try {
        const share = await Share.findById(id);
        if (!share) return res.status(404).json({ error: "Share not found" });

        if (share.quantity < quantity)
            return res
                .status(400)
                .json({ error: "Insufficient shares to sell" });

        share.quantity -= quantity;
        if (share.quantity === 0) await Share.findByIdAndDelete(id);
        else await share.save();

        res.json(share);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
