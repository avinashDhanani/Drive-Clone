import React from "react";
import { Box } from "./FooterStyles";

const Footer = () => {
  return (
    <div style={{ paddingTop: "100px" }}>
      <Box>
        <h4
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "1%",
            marginBottom: "1%",
          }}
        >
          this site is made by avinash dhanani copy right @avinash dhanani
        </h4>
      </Box>
    </div>
  );
};
export default Footer;
