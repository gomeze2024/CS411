import "../App.css";
import { motion } from "framer-motion";
import MyImage from "../character.PNG";
import axios from "axios";
import { useState, useEffect, React} from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout} from '@react-oauth/google';
import jwt_decode from "jwt-decode"

function MainPage() {
  const [profile, setProfile ] = useState([]);
  var id = localStorage.getItem("user");
  const [Id, setId] = useState('null/')

  useEffect(() => {
    googleLogout()
    setId(id)
  })

  const getData = async () => {
    await axios.get("http://localhost:8000/api/userinfo/" + Id).then(
      (response) => {
      }).catch(err => {
        put()
      })
  }
  const put = async () =>  {
    await axios.post('http://localhost:8000/api/userinfo/', {
      id: profile.replace('.',''),
      user_email: profile,
      location: "10462",
      weather: "We can't update your weather without your location. Give it to us please",
      news: "We can't update your news without your location. Give it to us please",
      color: "We can't update your color without you updating your color. Give it to us please"
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
  
  const styles = {
    background: "#2596be",
    borderRadius: 30,
    width: 150,
    padding: "10px 20px",
    margin: "auto",
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
    <Link to="/api" >
    <motion.button
      style={styles}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9}}
    >
      {type.name}
    </motion.button>
    </Link>
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
      background: '#f2f9ff'
    }}>
    <GoogleOAuthProvider clientId='135338852525-uodc4vsi2aucfl9lpnau5i32h98efmrd.apps.googleusercontent.com'>
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
          background: '#f2f9ff'
        }}
      >
      <Refresh
        type = {weather}>
      </Refresh>
      <Link to="/interact" >
      <motion.button style={charstyles}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95}}
          >
        <img src={MyImage} className="App-logo" alt="logo" />
      </motion.button>
       </Link>
      <Refresh 
        type = {news}>
      </Refresh>

    </div>
    <p style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: '#f2f9ff'
        }}></p>
    </div>
    );
  }

export default MainPage;