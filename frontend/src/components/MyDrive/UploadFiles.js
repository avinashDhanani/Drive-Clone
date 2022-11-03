import React, { useContext, useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";

function UploadFiles(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [path, setPath] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const accessToken = cookies.token;
  const nameInputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    setPath(props.path);
  });
  const saveFile = (e) => {
    e.preventDefault(); 
    console.log("this is e.target.files ", e.target.files[0]);
    console.log("this is e.target.files[0].name ", e.target.files[0].name);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Path", props.path);
    formData.append("File", file);
    await axios({
      method: "POST",
      url: `https://drive-clone-avinash.herokuapp.com/upload`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    })
      .then((res) => {
        console.log("this is res message");
      })
      .catch((error) => {
        console.log("this is error");
      });
    props.getAllFiles();
  };

  function submitHandler(event) {
    event.preventDefault();
    const enterdName = nameInputRef.current.value;
    try {
      axios
        .post("https://drive-clone-avinash.herokuapp.com/createFolder", {
          Authorization: `Bearer ${accessToken}`,
          FolderName: path + enterdName + "/",
        })
        .then((res) => {
          props.getAllFiles();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    props.getAllFiles();
  }
  const PopupExample1 = () => (
    <Popup
      trigger={
        <button type="button" className="btn  p-2 btn-primary btn-sm">
          Create Folder
        </button>
      }
      position="top left"
    >
      {(close) => (
        <div>
          <div>
            <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                <input
                  type="name"
                  required
                  id="name"
                  ref={nameInputRef}
                  placeholder="enter folder name"
                />
              </div>
              <div style={{ margin: "1%", position: "end" }}>
                <a
                  className="close"
                  style={{ textDecoration: "none", margin: "1%" }}
                  onClick={close}
                >
                  Cancel
                </a>
                <button onClick={{ submitHandler }}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );

  return (
    // <form onSubmit={uploadFile}>
    <div style={{ textAlign: "end" }}>
      <PopupExample1 onClick={PopupExample1} />
      <div
        className="btn mt-2 m-2"
        style={{ backgroundColor: "blue", color: "white" }}
      >
        <input type="file" onChange={saveFile} />
        <button
          type="submit"
          className="btn mx-2 btn-primary btn-sm"
          onClick={uploadFile}
        >
          UploadFile
        </button>
      </div>
    </div>
    // </form>
  );
}

export default UploadFiles;
