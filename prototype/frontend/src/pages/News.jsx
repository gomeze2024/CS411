import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';

function NewsPage() {
    var id = localStorage.getItem("user")
    const [quote, setQuote] = useState('boohoo')

    const getQuote = () => {
        axios.get("http://localhost:8000/api/userinfo/" + id).then(
          (response) => {
            //
            // Headline: response.data["news"]["News 1"][0] //
            // Country: response.data["news"]["News 1"][1] //
            // Description: response.data["news"]["News 1"][2] //
              setQuote(response.data["news"]["News 1"][0])
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
            News Page
            <Link to="/">
                Back to Main Page
            </Link>
        </div>
    );
}

export default NewsPage;
