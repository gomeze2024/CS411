import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import bodyBase from "../components/body base.PNG";
import bodyOlive from "../components/body olive.PNG";
import bodyTan from "../components/body tan.PNG";
import bodyDark from "../components/body dark.PNG";
import faceBase from "../components/face base.PNG";
import faceCool from "../components/face cool.PNG";
import faceBocchi from "../components/face aaa.PNG";
import faceDonham from "../components/face donham.PNG";
import hairBase from "../components/hair base.PNG";
import hairEndmark from "../components/hair endmark.PNG";
import hairDonham from "../components/hair donham.PNG";
import beard from "../components/beard.PNG";
import NuLl from "../components/null.PNG";
import outfitDonham from "../components/outfit donham.PNG";




function WeatherPage() {
    const [base, setBase] = useState("body base")
    const [face, setFace] = useState("face base")
    const [hair, setHair] = useState("hair base")
    const [access, setAccess] = useState("null")
    const [outfit, setOutfit] = useState("null")
    const [location, setLocation] = useState("No Data")
    const [temperature, setTemperature] = useState("No Data")
    const [description, setDescription] = useState("No Data")
    const [highlow, setHighLow] = useState("No Data")
    const [comment, setComment] = useState("No Data")
  
    var id = localStorage.getItem("user")
    const body = {"body base": bodyBase, "body olive": bodyOlive, "body tan": bodyTan, "body dark": bodyDark, 
    "face base": faceBase, "face cool": faceCool, "face killme": faceBocchi, "face donham": faceDonham,
    "hair base": hairBase, "hair endmark": hairEndmark, "hair donham": hairDonham, 
    "beard": beard, "null": NuLl, "outfit donham": outfitDonham}
  
    useEffect(() => {
      getData()
    })
    const getData = async () => {
        setTimeout(() => {
        axios.get("http://localhost:8000/api/userinfo/" + id).then(
          (response) => {
            setBase(response.data["color"]["base"])
            setFace(response.data["color"]["face"])
            setHair(response.data["color"]["hair"])
            setAccess(response.data["color"]["accessory"])
            setOutfit(response.data["color"]["outfit"])
            setLocation(response.data["weather"]["location"])
            setTemperature(response.data["weather"]["temperature"] + "º")
            setDescription(response.data["weather"]["description"])
            setHighLow(response.data["weather"]["high"] + "º      " + response.data["weather"]["low"] + "º")
            setComment(response.data["weather"]["comment"])
          }).catch(err => {
          })},100)
      }

      const charstyles = {
        background: "00",
        borderRadius: 40,
        width: 250,
        padding: "0px 0px",
        margin: "auto",
        color: "#00",
        outline: "none",
        border: "none",
        cursor: "pointer"
      }
    return (

        
        <div id="wrap"class="flex-container">
        <div class="flex-child3">
        <h1 class = "center3">{location}</h1>
        <h1 class = "center4">{temperature}</h1>
        <h1 class = "center">description</h1>
        <h1 class = "center4">{highlow}</h1>
        <h1 class = "center">{comment}</h1>
        
        </div>
        <div class="flex-child4">
        <Link to="/" >
      <motion.button class="imageWrapper" style={charstyles}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95}}
          >
        <img src={body[base]} class="overlayImage"/>
        <img src={body[face]} class="overlayImage"/>
        <img src={body[outfit]} class="overlayImage"/>
        <img src={body[access]} class="overlayImage"/>
        <img src={body[hair]} class="overlayImage"/>
      </motion.button>
      </Link>
        </div>
        </div>
    );
}

export default WeatherPage;