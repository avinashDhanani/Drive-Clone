import React from "react";
import Navigation from "../Navbar/navigation";
import SideBar from "../SideBar/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import folder from "../../asset/folder1.png";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import ShowAllFile from "./showAllFile";

function RecycleBin() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const accessToken = cookies.token;
  const [path, setPath] = useState("Bin/");
  const [reload, setReload] = useState([]);
  const [loding, setLoding] = useState(false);
  const getAllFiles = async () => {
    await axios
      .get("https://drive-clone-avinash.herokuapp.com/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          path,
        },
      })
      .then((res) => {
        setReload(res.data.Contents);
        setLoding(true);
      })
      .catch((e) => {
        console.log("error" + e);
      });
  };
  useEffect(() => {
    setLoding(false);
    getAllFiles();
    console.log("this is myDrive use effect", reload);
  }, [path]);

  const pathChange = (data) => {
    console.log(data);
    let newPath = "";
    if (data == "back@@@") {
      let arrayPathChange = path.split("/");
      for (let i = 0; i < arrayPathChange.length - 2; i++) {
        newPath = newPath + arrayPathChange[i] + "/";
      }
    } else {
      newPath = path + data + "/";
    }
    setPath(newPath);
  };
  function emptyRecycleBin() {
    axios
      .delete("http://localhost:8080/EmptyRecycleBin", {
        headers: {
          Authorization: `Bearer ${accessToken}`,   
        },
      })
      .then((res) => {
        setLoding(true);
        getAllFiles();
      })
      .catch((e) => {
        console.log("error" + e);
      });
  }
  return (
    <>
      <Navigation />
      <SideBar />

      <div style={{ marginLeft: "16%" }}>
        <h4>Recycle Bin</h4>
        <hr />
        <div
          style={{
            width: "100%",
            backgroundColor: "hsl(0, 12%, 97%)",
            display: "flex",

            textAlign: "center",
          }}
        >
          <p style={{ paddingTop: "0.2%", textAlign: "center", padding: "1%" }}>
            Empty Recycle Bin
          </p>
          <div style={{ marginTop: "1%" }}>
            <button
              type="button"
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
              }}
              onClick={emptyRecycleBin  }
            >
              Empty Recycle Bin
            </button>
          </div>
        </div>
        {loding ? (
          <ShowAllFile
            pathChangeFolder={pathChange}
            currentPath={path}
            currentData={reload}
            pathChange={pathChange}
            path={path}
          />
        ) : (
          <>
            <hr />
            <h1>Loding</h1>
          </>
        )}
      </div>
    </>
  );
}

export default RecycleBin;
