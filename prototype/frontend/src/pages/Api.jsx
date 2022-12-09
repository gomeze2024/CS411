import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';

function ApiPage() {
    var id = localStorage.getItem("user")
    const [quote, setQuote] = useState('boohoo')

    const getQuote = () => {
        axios.get("http://localhost:8000/api/userinfo/" + id).then(
          (response) => {
              setQuote(response.data["weather"]+"\n" + response.data["news"])
          }).catch(err => {
            console.log(err)
          })}
    useEffect(() => {
      getQuote()
  });
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f9ff",
            }}
        >
            {quote}
            API Page
            <Link to="/">
                Back to Main Page
            </Link>
        </div>
    );
}

export default ApiPage;