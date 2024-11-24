import React, { useState, useEffect } from "react";
import axios from "axios";
import ShareList from "../components/ShareList";

const Home = () => {
    const [shares, setShares] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/shares")
            .then((response) => setShares(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Share Market</h1>
            <ShareList shares={shares} />
        </div>
    );
};

export default Home;
