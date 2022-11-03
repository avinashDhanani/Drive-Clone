import Navigation from "../Navbar/navigation";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import React from "react";
import ShowAllFileAndFolder from "./ShowAllFileAndFolder";
import UploadFiles from "./UploadFiles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function MyDrive() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const accessToken = cookies.token;
  const [path, setPath] = useState("MyDrive/");
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
  const handleClick = (e) => {
    if (e.nativeEvent.which === 1) {
      console.log("Left click");
    } else if (e.nativeEvent.which === 3) {
      console.log("Right click");
    }
  };
  return (
    <>
      <Navigation />
      <SideBar />

      <div style={{ marginLeft: "16%" }}>
        <div>
          <h3>My Drive</h3>

          {loding ? (
            <ShowAllFileAndFolder
              pathChangeFolder={pathChange}
              currentPath={path}
              currentData={reload}
              pathChange={pathChange}
              path={path}
              getAllFiles={getAllFiles}
            />
          ) : (
            <>
              <h6 style={{ marginRight: "1%" }}>{path}</h6>
              <hr />
              <h1>Loding</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyDrive;
