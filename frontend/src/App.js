import "./App.css";
import { motion } from "framer-motion";
// import { Refresh } from "./components/charbutton";
import MyImage from "./character.PNG";
import { useState } from "react";
import { Tooltip, Form, Input, Button } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

const FormItem = Form.Item;

function App() {
  const [form] = Form.useForm();
  const [quote, setQuote] = useState("");
  const [location, setLocation] = useState({});
  const [weatherInfoDes, setWeatherInfoDes] = useState("");
  const [weatherInfoTem, setWeatherInfoTem] = useState("");
  const [visible, setVisible] = useState(false);

  const onSubmit = async () => {
    const { Color, Clothing } = await form.validate();
    setQuote(
      `Your favorite color is ${Color}, favorite Clothing is ${Clothing}`
    );
    form.resetFields()
    // api对接
  };

  const weather = {
    name: "Weather",
    qo: "Weather",
  };
  const news = {
    name: "News",
    qo: "News",
  };
  const calendar = {
    name: "Calendar",
    qo: "Calendar",
  };

  const styles = {
    background: "#2596be",
    borderRadius: 30,
    width: 150,
    padding: "10px 20px",
    margin: "auto",
    color: "#F7F7F0",
    outline: "none",
    border: "none",
    cursor: "pointer",
  };

  const Refresh = ({ type }) => (
    <motion.button
      style={styles}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => alert(type.qo)}
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
    cursor: "pointer",
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f9ff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f2f9ff",
        }}
      >
        <Tooltip
          position="tr"
          content={
            <>
              {location && (
                <p>
                  {`${location.name}'s Latitude is ${location.lat} Longitude is ${location.lon}`}
                </p>
              )}
              <p>{`The weather description is ${weatherInfoDes}`}</p>
              <p>{`The weather Temperature is ${weatherInfoTem}`}</p>
            </>
          }
          popupVisible={visible}
        >
          <motion.button
            style={charstyles}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setQuote("");
            }}
          >
            <img src={MyImage} className="App-logo" alt="logo" />
          </motion.button>
        </Tooltip>

        <Refresh type={weather}></Refresh>
        <Refresh type={news}></Refresh>
        <Refresh type={calendar}></Refresh>
      </div>
      {quote ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f2f9ff",
          }}
        >
          {quote}
        </p>
      ) : (
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
      )}
    </div>
  );
}

export default App;