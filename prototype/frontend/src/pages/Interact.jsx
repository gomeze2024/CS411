import '../App.css';
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { Link } from "react-router-dom";
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

const FormItem = Form.Item;

function Interact() {
  const [form] = Form.useForm();
  const [quote, setQuote] = useState('Hey! Let\'s Talk.')

  const [base, setBase] = useState("body base")
  const [face, setFace] = useState("face base")
  const [hair, setHair] = useState("hair base")
  const [access, setAccess] = useState("null")
  const [outfit, setOutfit] = useState("null")

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
      }).catch(err => {
      })},100)
  }

  const onSubmit = async () => {
    const { Color, Clothing } = await form.validate();
    setQuote(
      `Your favorite color is ${Color}, favorite Clothing is ${Clothing}`
    );
    form.resetFields()
    // api对接
  };
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
    }} >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#f2f9ff'
        }}
      >{quote}</div>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#f2f9ff'
        }}
      >
      <Link to="/" >
      <motion.button class="imageWrapper" style={charstyles}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95}}
          >
        <img src={body[base]} class="overlayImage2"/>
        <img src={body[face]} class="overlayImage2"/>
        <img src={body[outfit]} class="overlayImage2"/>
        <img src={body[access]} class="overlayImage2"/>
        <img src={body[hair]} class="overlayImage2"/>
      </motion.button>
      </Link>
    </div>
        <div class = "ineedtosleep">
        <Form
                    form={form}
                    style={{ width: 600, margin: "auto" }}
                    autoComplete="off"
                    onSubmit={onSubmit}
                >
                    <FormItem label="Color" field="Color" rules={[{ required: true }]}>
                        <Input placeholder="please enter your favorite Color..." />
                    </FormItem>
                    <FormItem
                        label="Clothing"
                        field="Clothing"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="please enter your favorite Clothing..." />
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 5 }} rules={[{ required: true }]}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </FormItem>
                </Form>
        </div>
    </div>
  );
}

export default Interact;