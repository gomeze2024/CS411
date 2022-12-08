import './App.css';
import { motion } from "framer-motion";
import MyImage from "./character.PNG"
import axios from "axios";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const FormItem = Form.Item;



function App() {
  const [form] = Form.useForm();
  const [quote, setQuote] = useState('boohoo')
  const [visible, setVisible] = useState(false);
  const [profile, setProfile ] = useState([]);
  const [Id, setId] = useState('null');

  useEffect(() => {
      const initClient = () => {
          gapi.client.init({
              clientId: clientId,
              scope: ''
          });
      };
      gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
      setProfile(res.profileObj);
      setId(String(profile.email).replace('.','')+"/");
      push();
  };

  const onFailure = (err) => {
      console.log('failed', err);
  };

  const logOut = () => {
      setProfile(null);
      setId("null");
  };

  const onSubmit = async () => {
    const { Color, Clothing } = await form.validate();
    setQuote(
      `Your favorite color is ${Color}, favorite Clothing is ${Clothing}`
    );
    form.resetFields()
    // api对接
  };

  const getQuote = () => {
    axios.get("http://localhost:8000/api/userinfo/" + Id).then(
      (response) => {
          setQuote(response.data["weather"])
      }).catch(err => {
        console.log(err)
      })
  }

  const push = () => { 
    axios.post("http://localhost:8000/api/userinfo/",{
        id: String(profile.email).replace('.',''),
        user_email: profile.email,
        location: "",
        weather: "",
        news: "",
        color: "",
    })
  }

  const handleDelete = () => {
    axios
      .put("http://localhost:8000/api/dressups/5/")
      .then((res) => this.refreshList());
  };
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
  const refreshList = () => {
    axios
      .get("/api/dressups/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
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
          onClick={push()}
          >
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
    <p>{Id}</p>
    <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
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

export default App;
