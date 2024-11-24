import React, { useState, useEffect } from "react";
import axios from "axios";

const Sell = () => {
    const [shares, setShares] = useState([]);
    const [selectedShare, setSelectedShare] = useState("");
    const [quantity, setQuantity] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/shares")
            .then((response) => setShares(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleSell = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/shares/sell",
                {
                    id: selectedShare,
                    quantity: parseInt(quantity),
                }
            );
            setMessage(`Successfully sold ${quantity} shares.`);
            setQuantity("");
            setShares((prev) =>
                prev.map((share) =>
                    share._id === selectedShare
                        ? { ...share, quantity: share.quantity - quantity }
                        : share
                )
            );
        } catch (error) {
            setMessage("Error selling shares. Please try again.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Sell Shares</h1>
            <form onSubmit={handleSell}>
                <div>
                    <label>Select Share:</label>
                    <select
                        value={selectedShare}
                        onChange={(e) => setSelectedShare(e.target.value)}
                        required
                    >
                        <option value="">-- Select a Share --</option>
                        {shares.map((share) => (
                            <option key={share._id} value={share._id}>
                                {share.name} - {share.quantity} available
                            </option>
                        ))}
                    </select>
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
                <button type="submit">Sell Shares</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Sell;
