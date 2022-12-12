import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';

var numbers = [1, 2, 3, 4, 5]
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o
}
var random = shuffle(numbers)
const searchy = "http://google.com/search?q="

function NewsPage() {
    var id = localStorage.getItem("user")
    const [header, headLine] = useState('boohoo')
    const [country, countri] = useState('boohoo')
    const [description, descrip] = useState('boohoo')
    const [header1, headLine1] = useState('boohoo')
    const [country1, countri1] = useState('boohoo')
    const [description1, descrip1] = useState('boohoo')
    const [header2, headLine2] = useState('boohoo')
    const [country2, countri2] = useState('boohoo')
    const [description2, descrip2] = useState('boohoo')

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = today.toLocaleString('default', { month: 'long' });
    var yyyy = today.getFullYear();
    var today = mm + ' ' + dd + ', ' + yyyy;

    var newsy = "News " + random[1]
    var linke = searchy.concat(header.replace(/\s/g, '+'))
    var newsy1 = "News " + random[2]
    var linke1 = searchy.concat(header1.replace(/\s/g, '+'))
    var newsy2 = "News " + random[3]
    var linke2 = searchy.concat(header2.replace(/\s/g, '+'))

    const getQuote = () => {
        axios.get("http://localhost:8000/api/userinfo/" + id).then(
          (response) => {
              headLine(response.data["news"][newsy][0])
              countri(response.data["news"][newsy][1])
              descrip(response.data["news"][newsy][2])
              headLine1(response.data["news"][newsy1][0])
              countri1(response.data["news"][newsy1][1])
              descrip1(response.data["news"][newsy1][2])
              headLine2(response.data["news"][newsy2][0])
              countri2(response.data["news"][newsy2][1])
              descrip2(response.data["news"][newsy2][2])
          }).catch(err => {
            console.log(err)
    })}

    useEffect(() => {
      getQuote()
    });
  
    return (
    <body>
        <div style={{position: "relative", backgroundColor: "#f2f9ff", padding: 10}}>   
            <div>
                <button style={{padding:"0px"}}>
                    <a type="button" href="/" style={{
                    backgroundColor: "rgb(37, 150, 190)",
                    border: "none",
                    color: "white",
                    padding: "10px 17px",
                    textAlign: "center",
                    fontSize: "16px",
                    borderRadius: "6px"
                    }}>Back to Main Page</a>
                </button>
                <div style={{position:"relative", textAlign:"right", left:"-50px", bottom:"15px"}}>{today}</div>
            </div>

            <h1 style={{
                position: "relative",
                textAlign:"center", 
                fontSize:"50px",
                fontFamily: "museo",
                bottom: "30px"
            }}><bf>World News</bf>&nbsp;&nbsp;&#127758;</h1>  
        </div>

        <a href={linke} target="_blank" style={{textDecoration:"none", color:"black"}}>
        <div style={{padding:25, borderStyle:"double", borderRadius:"10px", fontFamily: "nyt-cheltenham, georgia, times new roman, times, serif"}}>
            <h2>{header}</h2>
            <div style={{textTransform:"uppercase"}}>{country}</div>
            <div>{description}</div>
        </div>
        </a>

        <div style={{padding:10}}></div>

        <a href={linke1} target="_blank" style={{textDecoration:"none", color:"black"}}>
        <div style={{padding:25, borderStyle:"double", borderRadius:"10px", fontFamily: "nyt-cheltenham, georgia, times new roman, times, serif"}}>
            <h2>{header1}</h2>
            <div style={{textTransform:"uppercase"}}>{country1}</div>
            <div>{description1}</div>
        </div>
        </a>

        <div style={{padding:10}}></div>

        <a href={linke2} target="_blank" style={{textDecoration:"none", color:"black"}}>
        <div style={{padding:25, borderStyle:"double", borderRadius:"10px", fontFamily: "nyt-cheltenham, georgia, times new roman, times, serif"}}>
            <h2>{header2}</h2>
            <div style={{textTransform:"uppercase"}}>{country2}</div>
            <div>{description2}</div>
        </div>
        </a>

    </body>
    )}

export default NewsPage;
