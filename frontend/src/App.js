import './App.css';
import logo from './character.PNG';
import { motion } from "framer-motion";
import { Refresh } from "./components/charbutton";
import MyImage from "./character.PNG"

function App() {
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
  };
  return (
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
          whileTap={{ scale: 0.95}}>
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
  );
}

export default App;
