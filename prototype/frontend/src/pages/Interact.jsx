import '../App.css';
import { motion } from "framer-motion";
import MyImage from "../character.PNG"

import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { Link } from "react-router-dom";

const FormItem = Form.Item;

function Interact() {
  const [form] = Form.useForm();
  const [quote, setQuote] = useState('boohoo')
  var id = localStorage.getItem("user");

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
    }}>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#f2f9ff'
        }}
      >
    <Link to="/" >
      <motion.button style={charstyles}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95}}
          >
        <img src={MyImage} className="App-logo" alt="logo" />
      </motion.button>
      </Link>
    </div>

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
    <p style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#f2f9ff'
        }}>{quote}</p>
    </div>
  );
}

export default Interact;