import "../App.css";
import { motion } from "framer-motion";
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
import background from "../components/background.PNG";

import axios from "axios";
import { useState, useEffect, React} from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout} from '@react-oauth/google';
import jwt_decode from "jwt-decode"

function MainPage() {
  const [profile, setProfile ] = useState([]);
  var id = localStorage.getItem("user");
  var clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  
  const body = {"body base": bodyBase, "body olive": bodyOlive, "body tan": bodyTan, "body dark": bodyDark, 
    "face base": faceBase, "face cool": faceCool, "face killme": faceBocchi, "face donham": faceDonham,
    "hair base": hairBase, "hair endmark": hairEndmark, "hair donham": hairDonham, 
    "beard": beard, "null": NuLl, "outfit donham": outfitDonham}

  const [Id, setId] = useState('null/')
  const [base, setBase] = useState("body base")
  const [face, setFace] = useState("face base")
  const [hair, setHair] = useState("hair base")
  const [access, setAccess] = useState("null")
  const [outfit, setOutfit] = useState("null")

  useEffect(() => {
    googleLogout()
    setId(id)
    getData()
  })

  const getData = async () => {
    setTimeout(() => {
    axios.get("http://localhost:8000/api/userinfo/" + Id).then(
      (response) => {
        setBase(response.data["color"]["base"])
        setFace(response.data["color"]["face"])
        setHair(response.data["color"]["hair"])
        setAccess(response.data["color"]["accessory"])
        setOutfit(response.data["color"]["outfit"])
      }).catch(err => {
        post()
      })},1000)
  }
  

  const post = async () =>  {
    await axios.post('http://localhost:8000/api/userinfo/', {
      id: profile.replace('.',''),
      user_email: profile,
      location: "02215",
      weather: "We can't update your weather without your location. Give it to us please",
      news: "We can't update your news without your location. Give it to us please",
      color: {
        "base": "body base",
        "face": "face base",
        "hair": "hair base",
        "accessory": "null",
        "outfit": "null"
      }}
    )
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
   });
  }

  const put = async () =>  {
    await axios.put('http://localhost:8000/api/userinfo/' + Id, {
      user_email: profile,
  })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
   });
  }

  const weather = {
    name: 'Weather',
  }
  const news = {
    name: 'News',
  }
  const customize = {
    name: 'Customize',
  }
  
  const styles = {
    background: "#2596be",
    borderRadius: 30,
    width: 150,
    padding: "10px 20px",
    margin: "5px",
    color: "#F7F7F0",
    outline: "#F7F7F0",
    border: "10px",
    cursor: "pointer"
  };

  const logoutstyles = {
    background: "#ffffff",
    borderRadius: 0,
    width: 200,
    padding: "10px 20px",
    margin: "auto",
    color: "#424242",
    outline: "none",
    border: "1px solid #dbdbdb",
    cursor: "pointer"
  }

  const Refresh = ({type}) => (
    <motion.button
      style={styles}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9}}
    >
      {type.name}
    </motion.button>
  );

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
    <div style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
    <GoogleOAuthProvider clientId={clientId}>
    <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
      setProfile(String((jwt_decode(credentialResponse.credential)).email));
      localStorage.setItem("user", ((jwt_decode(credentialResponse.credential)).email).replace('.','') + "/");
      setId(((jwt_decode(credentialResponse.credential)).email).replace('.',''));
      getData();
    }}
    onError={() => {
      console.log('Login Failed');
      localStorage.setItem("user", "null/")
    }}
  />

    <motion.button 
      onClick= {credentialResponse => {googleLogout(); 
        localStorage.setItem("user", "null/")
        setId("null/") }}
      style = {logoutstyles}
      whileHover={{opacity: 0.5 }}
      >
        Logout
    </motion.button>
    </GoogleOAuthProvider>

    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      <Link to="/weather" >
      <Refresh
        type = {weather}
        onClick = {put}>
      </Refresh>
      </Link>

      <Link to="/news" >
      <Refresh 
        type = {news}
        onClick = {put}>
      </Refresh>
      </Link>
      
      <Link to="/customize" >
      <Refresh 
        type = {customize}
        onClick = {put}>
      </Refresh>
      </Link>
      
    </div>
    <p style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${background})`
        }}>

    <Link to="/interact" >
      <motion.button class="imageWrapper2" style={charstyles}
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
        </p>

    </div>
    );
  }

export default MainPage;