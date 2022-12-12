import { Link } from "react-router-dom";
import { useState} from "react";
import { Form, Input, Button } from "@arco-design/web-react";
//images//
import based from "../components/base.PNG";
import olived from "../components/olive.PNG";
import tand from "../components/tan.PNG";
import darkd from "../components/dark.PNG";
import maineye from "../components/maineye.PNG";
import cooleye from "../components/cooleye.PNG";
import anyaeye from "../components/anyaeye.PNG";
import glasseseye from "../components/glasseseye.PNG";
import elliothair from "../components/elliothair.PNG";
import endmarkhair from "../components/endmarkhair.PNG";
import littlehair from "../components/littlehair.PNG";
import bearding from "../components/bearding.PNG";
import shirticon from "../components/shirticon.PNG";
import nullicon from "../components/nullicon.PNG";

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

import axios from "axios";
import { motion } from "framer-motion";
import "../App.css";

function CustomizePage() {
    var id = localStorage.getItem("user");
    const FormItem = Form.Item;
    const [form] = Form.useForm();
    const [location, setLocation] = useState('10462');
    
    const body = {"body base": bodyBase, "body olive": bodyOlive, "body tan": bodyTan, "body dark": bodyDark, 
    "face base": faceBase, "face cool": faceCool, "face killme": faceBocchi, "face donham": faceDonham,
    "hair base": hairBase, "hair endmark": hairEndmark, "hair donham": hairDonham, 
    "beard": beard, "null": NuLl, "outfit donham": outfitDonham}

    const base_con = [based, olived, tand, darkd]
    const face_con = [maineye, cooleye, anyaeye, glasseseye]
    const hair_con = [elliothair, endmarkhair, littlehair, nullicon]
    const access_con = [bearding, nullicon, nullicon, nullicon]
    const outfit_con = [shirticon, nullicon, nullicon, nullicon]

    const base_con2 = ["body base", "body olive", "body tan", "body dark","null", "null"]
    const face_con2 = ["face base", "face cool", "face killme", "face donham", "null", "null"]
    const hair_con2 = ["hair base", "hair endmark", "hair donham", "null", "null", "null"]
    const access_con2 = ["beard", "null", "null", "null", "null", "null"]
    const outfit_con2 = ["outfit donham", "null", "null", "null", "null", "null"]
    const [type_con, setCon] = useState(base_con)

    const [all] = useState(["active", "inactive", "inactive", "inactive", "inactive", "inactive"])
    const [bases, setBases] = useState("body base")
    const [faces, setFaces] = useState("face base")
    const [hairs, setHairs] = useState("hair base")
    const [access, setAccess] = useState("null")
    const [outfit, setOutfit] = useState("null")

    const [ba, setBa] = useState(0)

    const putData = async () =>  {
      if (id !== "null/") {
        await axios.put('http://localhost:8000/api/userinfo/' + id, {
          "location": location,
          "color": {
            "base": bases,
            "face": faces,
            "hair": hairs,
            "accessory": access,
            "outfit": outfit
          }
      })
        .then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
       })};
      }
    const onSubmit = async () => {
        const { Color} = await form.validate();
        setLocation(
          `${Color}`
        );
        form.resetFields()
      };

    function displayOptions (num) {
      if (type_con[0] === base_con[0]) {
        all[ba] = "inactive"
        all[num] = "active"
        setBases(base_con2[num])
        setBa(num)
      } else if (type_con[0] === face_con[0]) {
        all[ba] = "inactive"
        all[num] = "active"
        setFaces(face_con2[num])
        setBa(num)
      } else if (type_con[0] === hair_con[0]) {
        all[ba] = "inactive"
        all[num] = "active"
        setHairs(hair_con2[num])
        setBa(num)
    } else if (type_con[0] === access_con[0]) {
      all[ba] = "inactive"
      all[num] = "active"
      setAccess(access_con2[num])
      setBa(num)
    } else if (type_con[0] === outfit_con[0]) {
      all[ba] = "inactive"
      all[num] = "active"
      setOutfit(outfit_con2[num])
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

      const styles2 = {
        background: "#f57f73",
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

      const Refresh2 = ({type}) => 
      (
        <motion.button
          onClick= {putData}
          style={styles2}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95}}
        >
          {type.name}
        </motion.button>

      );
      const base = {
        name: 'BASE',
        func: base_con
      }
      
      const face = {
        name: 'FACE',
        func: face_con
      }
      
      const hair = {
        name: 'HAIR',
        func: hair_con
      }

      const acceses = {
        name: 'ACCESSORIES',
        func: access_con
      }
      const outfits = {
        name: 'OUTFIT',
        func: outfit_con
      }
      const continues = {
        name: 'CONTINUE'
      }

    return (
      
    <div class="flex-container">
    <div class="flex-child">
    <h1 class = "center">CUSTOMIZE CHARACTER</h1>
      <div class="imageWrapper" style={charstyles}
          >
        <img src={body[bases]} class="overlayImage"/>
        <img src={body[faces]} class="overlayImage"/>
        <img src={body[hairs]} class="overlayImage"/>
        <img src={body[outfit]} class="overlayImage"/>
        <img src={body[access]} class="overlayImage"/>
      </div>
    
    </div>
    <div class="flex-child2">
    <div class="right">
      <Link to="/" >
      <Refresh2
        type = {continues}>
      </Refresh2>
      </Link>
      <Form
        form={form}
        style={{ width: 600, margin: "auto" }}
        autoComplete="off"
        onSubmit={onSubmit}
    >
        <FormItem label="Location" field="Color" rules={[{ required: true }]}>
            <Input placeholder="Please enter your ZIP code..." />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }} rules={[{ required: true }]}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </FormItem>
    </Form>
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

      <Refresh 
        type = {acceses}>
      </Refresh>

      <Refresh 
        type = {outfits}>
      </Refresh>

      <div class="pagination" width="20" height="30">
        <a class={all[0]} onClick = {() => displayOptions(0)} >
        <img src={type_con[0]} width="80" height="80"/>
        </a>
        <a class={all[1]} onClick = {() => displayOptions(1)}>
        <img src={type_con[1]} width="80" height="80"/>
        </a>
        <a class={all[2]} onClick = {() => displayOptions(2)}>
        <img src={type_con[2]} width="80" height="80"/>
        </a>
        <a class={all[3]} onClick = {() => displayOptions(3)}>
        <img src={type_con[3]} width="80" height="80"/>
        </a>
        <a class={all[4]} onClick = {() => displayOptions(4)}>
        </a>
        <a class={all[5]} onClick = {() => displayOptions(5)}></a>
        
      </div>
    </div>
    </div>
    </div>
    )
}
//onClick = {() => displayOptions(0)}//

export default CustomizePage;