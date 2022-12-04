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
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
const baseURL = "http://localhost:8000";

const FormItem = Form.Item;


const handleGoogleLogin = (response) => {
  axios
    .post(`${baseURL}/auth/convert-token`, {
      token: response.accessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: drfClientId,
      client_secret: drfClientSecret,
    })
    .then((res) => {
      const { access_token, refresh_token } = res.data;
      console.log({ access_token, refresh_token });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    })  
    .catch((err) => {
      console.log("Error Google login", err);
    });
};

function App() {
  const [form] = Form.useForm();
  const [quote, setQuote] = useState('boohoo')
  const [visible, setVisible] = useState(false);
  const [ profile, setProfile ] = useState([]);
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
      pushQuote ()
  };

  const onFailure = (err) => {
      console.log('failed', err);
  };

  const logOut = () => {
      setProfile(null);
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
    axios.get("http://localhost:8000/api/dressups/12/").then(
      (response) => {
          setQuote(response.data["description"])
      }).catch(err => {
        console.log(err)
      })
  }

  const pushQuote = () => {
        axios.get("http://localhost:8000/api/dressups/5/").then(
          (response) => {
              setQuote(response.data["description"])
          }).catch(err => {
            console.log(err)
          })
        axios.post("http://localhost:8000/api/dressups/",{
            title: profile.email,
            description: "you did it congrats",
            completed: true
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
          onClick={pushQuote}>
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
    <p>Email Address: {profile.email}</p>
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
