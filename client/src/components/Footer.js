import React from "react";
import Calendar from "react-calendar";

const Footer = () => {
  return (
    <footer
      className="text-center mt-5"
      style={{
        backgroundColor: "darkgreen",
        height: "35px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "white",
        }}
      >
        &copy; 2023 Prime Construct (Pvt) Ltd. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
