import React from "react";

const ShareList = ({ shares }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {shares.map((share) => (
                    <tr key={share._id}>
                        <td>{share.name}</td>
                        <td>{share.price}</td>
                        <td>{share.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ShareList;
