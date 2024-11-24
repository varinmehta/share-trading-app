import React, { useState } from "react";
import axios from "axios";

const Buy = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [message, setMessage] = useState("");

    const handleBuy = async (e) => {
        e.preventDefault();

        try {
            // eslint-disable-next-line
            const response = await axios.post(
                "http://localhost:5000/api/shares/buy",
                {
                    name,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                }
            );
            setMessage(
                `Successfully bought ${quantity} shares of ${name} at ₹${price} each.`
            );
            setName("");
            setPrice("");
            setQuantity("");
        } catch (error) {
            setMessage("Error buying shares. Please try again.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Buy Shares</h1>
            <form onSubmit={handleBuy}>
                <div>
                    <label>Share Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Price per Share:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Buy Shares</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Buy;
