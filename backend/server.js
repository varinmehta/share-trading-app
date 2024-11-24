const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const shareRoutes = require("./routes/shareRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/shares", shareRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Start server (only if not testing)
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
