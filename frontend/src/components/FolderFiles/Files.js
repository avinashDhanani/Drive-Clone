import folder from "../../asset/txt.png";
import Popup from "reactjs-popup";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "./FolderFiles.module.css";
import { useNavigate } from "react-router-dom";

function Files(props) {
  const [data, setData] = useState(props.folderName);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (props.fileName != "amzone1234.txt") {
      setData(props.fileName);
      setVisible(true);
    }
  }, [props]);

  function fileDownload(e) {
    props.onClickFile(data);
  }
  function fileDelete(e) {
    props.deleteFile(data);
  }
  function submitHandler(e) {}
  function click() {
    console.log("button clicked!!!");
  }
  const PopupExample1 = () => (
    <Popup
      trigger={
        <div className="p-2">
          <div
            style={{
              margin: "1%",
              height: "100px",
              width: "100px",
            }}
            // onClick={fileDownload}
          >
            <img src={folder} style={{ width: "95px", marginBottom: "1%" }} />
            <div style={{ width: "95px", height: "50px", overflow: "hidden" }}>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {data}
              </p>
            </div>
          </div>
        </div>
      }
      position="top left"
    >
      {(close) => (
        <div>
          <button
            type="button"
            className={classes.buttonStyle}
            onClick={fileDownload}
          >
            download
          </button>
          <button type="button" className={classes.buttonStyle} onClick={click}>
            starred
          </button>
          <button type="button" className={classes.buttonStyle} onClick={fileDelete}>
            delete
          </button>
        </div>
      )}
    </Popup>
  );
  return (
    <>
      {visible ? (
        <div>
          <PopupExample1 />
          {/* <div
            style={{
              margin: "1%",
              height: "100px",
              width: "100px",
            }}
            onClick={fileDownload}
          >
            <img src={folder} style={{ width: "95px", marginBottom: "1%" }} />
            <div style={{ width: "95px", height: "50px", overflow: "hidden" }}>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {data}
              </p>
            </div>
          </div> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Files;
