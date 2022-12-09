import "../App.css";
import { motion } from "framer-motion";
import MyImage from "../character.PNG";
import axios from "axios";
import { useState, useEffect, React} from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import "@arco-design/web-react/dist/css/arco.css";
import { Link } from "react-router-dom";

const clientId = '135338852525-uodc4vsi2aucfl9lpnau5i32h98efmrd.apps.googleusercontent.com';

function MainPage() {
  const [quote, setQuote] = useState('boohoo')
  const [profile, setProfile ] = useState([]);
  var id = localStorage.getItem("user");
  const [Id, setId] = useState(id);

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
      if (Id == 'undefined/') {
        localStorage.setItem("user", (String(profile.email).replace('.','')+"/"));
      } else {
        localStorage.setItem("user", id);

      }
  };

  const onFailure = (err) => {
      console.log('failed', err);
  };

  const logOut = () => {
      setProfile(null);
      setId("null");
      localStorage.setItem("user", "null/");
  };


  const getQuote = () => {
    axios.get("http://localhost:8000/api/userinfo/" + Id).then(
      (response) => {
          setQuote(response.data["weather"])
      }).catch(err => {
        console.log(err)
      })
  }

  const logout = () => {
    setProfile([]);
    setId("null/");
  }

  const push = () => 
    axios.post('http://localhost:8000/api/userinfo/', {
      id: String(profile.email).replace('.',''),
      location: "02215",
      user_email: profile.email,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });{ 
  }

  const put = () => {
  axios.put('http://localhost:8000/api/userinfo/' + Id, {
    user_email: profile.email,
    location: "02215",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
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
    <Link to="/api" >
    <motion.button
      style={styles}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9}}
      onClick={getQuote}
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
    <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
    <GoogleLogout
          clientId={clientId}
          buttonText="Sign Out"
          onSuccess={logOut}
          onFailure={logOut}
      />
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
          onClick={put}
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