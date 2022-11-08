import './App.css';
import { motion } from "framer-motion";
import { Refresh } from "./components/charbutton";

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
  return (
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
