import React from "react";
import Navigation from "../Navbar/navigation";
import SideBar from "../SideBar/SideBar";
import folder from "../../asset/folder1.png";
import zip from "../../asset/zipfile.jfif";

function Starred() {
  return (
    <div>
      <Navigation />
      <SideBar />
      <div style={{ "marginLeft": "16%" }}>
        <h4>Starred</h4>
        <hr />
        <h6>Folder</h6>
        <hr />
        <img src={folder} style={{ "height": "80px", "margin": "1%" }} />
        <br />
        <h6>File</h6>
        <hr />
        <img src={zip} style={{ "height": "95px", "margin": "1%" }} />
      </div>
    </div>
  );
}

export default Starred;
