import React, { useEffect, useState } from "react";
import Folder from "../FolderFiles/Folder";
import File from "../FolderFiles/Files";
import axios from "axios";
import fileDownload from "js-file-download";
import { useCookies } from "react-cookie";
import UploadFiles from "./UploadFiles";

function ShowAllFileAndFolder(props) {
  const [data, setData] = useState(props.currentData);
  const [folder, setFolder] = useState(() => new Set());
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loding, setLoding] = useState(false);
  const accessToken = cookies.token;
  const addItem = (item) => {
    setFolder((prev) => new Set(prev).add(item));
  };

  const removeItem = (item) => {
    setFolder((prev) => {
      const next = new Set(prev);
      next.delete(item);
      return next;
    });
  };

  useEffect(() => {
    setData(props.currentData);
    data.map((dataSet) => {
      let ans = dataSet.Key.split("/");
      if (ans.length > 1) {
        addItem(ans[0]);
      }
      return true;
    });
    setLoding(true);
  }, [props, data]);

  function changeBackPath(e) {
    setFolder(() => new Set());
    props.pathChange("back@@@");
  }

  function onClickFolder(data) {
    setFolder(() => new Set());
    props.pathChange(data);
  }

  const onClickFile = async (data) => {
    console.log(props.currentPath + data);
    const path = props.currentPath + data;

    await axios
      .get("https://drive-clone-avinash.herokuapp.com/download", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          path,
        },
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, data);
      })
      .catch((e) => {
        console.log("error" + e);
      });
  };

  const deleteFile = async (data) => {
    console.log(props.currentPath + data);
    const path = props.currentPath + data;

    await axios
      .delete("https://drive-clone-avinash.herokuapp.com/delete", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          path,
        }
      })
      .then((res) => {
        console.log("file deleted sucessfully" + res.data);
        props.getAllFiles();
      })
      .catch((e) => {
        console.log("error" + e);
      });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {props.currentPath != "MyDrive/" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
            style={{ marginRight: "1%" }}
            onClick={changeBackPath}
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
        ) : (
          <></>
        )}

        <div>
          <h6 style={{ marginRight: "1%", marginLeft: "1%" }}>
            {props.currentPath}
          </h6>
          <UploadFiles
            path={props.path}
            style={{ marginRight: "1%" }}
            getAllFiles={props.getAllFiles}
          />
        </div>
      </div>
      <hr />

      {loding ? (
        <div>
          {Array.from(folder).length != 0 ? (
            <div>
              <h3>Folder</h3>
              <div style={{ display: "flex" }}>
                {Array.from(folder).map((fold) => {
                  return (
                    <Folder
                      key={fold}
                      folderName={fold}
                      onClickFolder={onClickFolder}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {Array.from(folder).length != data.length &&
          Array.from(folder).length != data.length-1 ? (
            <div>
              <h3>Files</h3>
              <div style={{ display: "flex" }}>
                {data.map((dataSet) => {
                  let ans = dataSet.Key.split("/");
                  if (ans.length == 1) {
                    return (
                      <File
                        key={dataSet.Etag}
                        fileName={dataSet.Key}
                        onClickFile={onClickFile}
                        deleteFile={deleteFile}
                        getAllFiles={props.getAllFiles}
                      />
                    );
                  }
                  return <></>;
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
          {data.length == 1 ? (
            <div>
              <h4>this is empty</h4>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <h1>Loding</h1>
      )}
    </div>
  );
}

export default ShowAllFileAndFolder;
