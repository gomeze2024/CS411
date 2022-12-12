import { Link } from "react-router-dom";
import { useState} from "react";
import MyImage from "../components/body base.PNG";
import MyEyes from "../components/face base.PNG";
import MyHair from "../components/hair base.PNG";
import { motion } from "framer-motion";
import "../App.css";

function CustomizePage() {
    const base_con = ["body base", "body olive", "body tan", "body dark", "null", "null"]
    const face_con = ["face base", "face cool", "face killme", "face donham", "null", "null"]
    const hair_con = ["face base", "hair endmark", "hair donham", "null", "null", "null"]
    const [type_con, setCon] = useState(base_con)

    const [all] = useState(["active", "inactive", "inactive", "inactive", "inactive", "inactive"])
    const [bases] = useState({"body base": "active", "body olive": "inactive", "body tan": "inactive", "body dark": "inactive",  "null": "inactive"})
    const [faces] = useState({"face base": "active", "face cool": "inactive", "face killme": "inactive", "face donham": "inactive", "null": "inactive"})
    const [hairs] = useState({"hair base": "active", "hair endmark": "inactive", "hair donham": "inactive", "null": "inactive"})

    const [ba, setBa] = useState(0)

    const Bases = () => {
      setCon(0)
    }

    const Faces = () => {
      setCon(2)
    }

    const Hairs = () => {
      setCon(3)
    }
    function displayOptions (num) {
      if (type_con[0] === base_con[0]) {
        all[ba] = "inactive"
        all[num] = "active"
        bases[base_con[num]] = "active"
        bases[base_con[ba]] = "inactive"
        setBa(num)
      } else if (type_con[0] === face_con[0]) {
        all[ba] = "inactive"
        all[num] = "active"
        faces[face_con[num]] = "active"
        faces[face_con[ba]] = "inactive"
        setBa(num)
      } else if (type_con[0] === hair_con[0]) {
        all[ba] = "inactive"
        all[num] = "active"
        hairs[hair_con[num]] = "active"
        hairs[hair_con[ba]] = "inactive"
        setBa(num)
    }
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

    const styles = {
        background: "#2596be",
        borderRadius: 10,
        height: 50,
        width: 200,
        padding: "10px 50px",
        margin: "5px",
        color: "#F7F7F0",
        outline: "#F7F7F0",
        border: "10px",
        cursor: "pointer"
      };
      
      const Refresh = ({type}) => 
      (
        <motion.button
          onClick= {() => {setCon(type.func)}}
          style={styles}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95}}
        >
          {type.name}
        </motion.button>

      );
      const base = {
        name: 'BASE',
        func: base_con,
      }
      
      const face = {
        name: 'FACE',
        func: face_con,
      }
      const hair = {
        name: 'HAIR',
        func: hair_con,
      }
      const continues = {
        name: 'CONTINUE',
        func: base_con,
      }
    return (
      
    <div class="flex-container">

    <div class="flex-child">
      {type_con}
    <h1 class = "center">CUSTOMIZE CHARACTER</h1>
      <div class="imageWrapper" style={charstyles}
          >
        <img src={MyImage} class="overlayImage"/>
        <img src={MyEyes} class="overlayImage"/>
      </div>
    
    </div>
    <div class="flex-child2">
    <div class="right">
      <Link to="/" >
      <Refresh
        type = {continues}>
      </Refresh>
      </Link>
    </div>
    <div class="center2">
      <Refresh 
        type = {base}
        >
      </Refresh>

      <Refresh 
        type = {face}>
      </Refresh>

      <Refresh 
        type = {hair}>
      </Refresh>
      <div class="pagination">
        <a class={all[0]} href="#" onClick = {() => displayOptions(0)} >{type_con[0]}</a>
        <a class={all[1]} href="#" onClick = {() => displayOptions(1)}>{type_con[1]}</a>
        <a class={all[2]} href="#" onClick = {() => displayOptions(2)}>{type_con[2]}</a>
        <a class={all[3]} href="#" onClick = {() => displayOptions(3)}>{type_con[3]}</a>
        <a class={all[4]} href="#" onClick = {() => displayOptions(4)}>{type_con[4]}</a>
        <a class={all[5]} href="#" onClick = {() => displayOptions(5)}>{type_con[5]}</a>
        
      </div>
    </div>
    </div>
    </div>
    )
}
//onClick = {() => displayOptions(0)}//

export default CustomizePage;