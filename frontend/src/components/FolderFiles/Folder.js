import React, { useEffect, useState } from "react";
import folder from "../../asset/folder1.png";

function Folder(props) {
  const [data, setData] = useState(props.folderName);
  useEffect(() => {
    setData(props.folderName);
  }, [props]);
  function onClickFolder(e) {
    // e.event
    props.onClickFolder(data)
  }
  return (
    
      <div
        style={{
          textAlign: "center",
          margin: "1%",
          height: "120px",
          width: "100px",
        }}
        onClick={onClickFolder}
      >
        <img src={folder} style={{ height: "80px", margin: "1%" }} />
        <h6 style={{ margin: "1%", textAlign: "center" ,width:"95px",height:"95px"}}>{data}</h6>
      </div>
  );
}

export default Folder;
