import './App.css';
import { motion } from "framer-motion";
import { Refresh } from "./components/charbutton";
import MyImage from "./character.PNG"
import axios from "axios";
import { useState } from 'react';

function App() {
  const [quote, setQuote] = useState('boohoo')
  const getQuote = () => {
    axios.get("http://localhost:8000/api/dressups/").then(
      (response) => {
          setQuote(response.data[0].description)
      }).catch(err => {
        console.log(err)
      })

  }
  const weather = {
    name: 'Weather',
    qo: "Weather"
  }
  const news = {
    name: 'News',
    qo: "News"
  }
  const calendar = {
    name: 'Calendar',
    qo: "Calendar"
  }
  
  const styles = {
    background: "#2596be",
    borderRadius: 30,
    width: 150,
    padding: "10px 20px",
    margin: "auto",
    color: "#F7F7F0",
    outline: "none",
    border: "none",
    cursor: "pointer"
  };

  const Refresh = ({type}) => (
    <motion.button
      style={styles}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9}}
      onClick={getQuote}
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
      backgroundColor: '#f2f9ff'
    }}>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#f2f9ff'
        }}
      >
      <motion.button style={charstyles}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95}}
          onClick={() => setQuote("looking kinda sus there bud")}>
        <img src={MyImage} className="App-logo" alt="logo" />
      </motion.button>
      <Refresh
       type = {weather}>
      </Refresh>
      <Refresh 
       type = {news}>
      </Refresh>
      <Refresh 
       type = {calendar}>
      </Refresh>
    </div>
    <p style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#f2f9ff'
        }}>{quote}</p>
    </div>
  );
}

export default App;
