import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';

function WeatherPage() {
    var id = localStorage.getItem("user")
    const [quote, setQuote] = useState('boohoo')

    const getQuote = () => {
        axios.get("http://localhost:8000/api/userinfo/" + id).then(
          (response) => {
            //How to Access All the Data//
            // response.data["weather"]["location"] //
            // response.data["weather"]["temperature"] //
            // response.data["weather"]["description"] //
            // response.data["weather"]["high"] //
            // response.data["weather"]["low"] //
            // response.data["weather"]["comment"] //
              setQuote(response.data["weather"]["temperature"])
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
            Weather Page
            <Link to="/">
                Back to Main Page
            </Link>
        </div>
    );
}

export default WeatherPage;