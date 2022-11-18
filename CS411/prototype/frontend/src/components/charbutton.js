import React from "react";
import { motion } from "framer-motion";
import getQuote from "../App"

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

export const Refresh = ({type}) => (
  <motion.button
    style={styles}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9}}
    onClick={getQuote}
  >
    {type.name}
  </motion.button>
);
