import React from "react";
import classes from "./SideBar.module.css";
import { Link,useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsStar } from "react-icons/bs";
import "./SideBar.module.css";
import DownloadProgressBar from "./DownloadProgressBar";
import { useCookies } from "react-cookie";


const SideBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  if (cookies.token == null ) {
    navigate("/")
  }

  return (
    <div>
      <div className={classes.sidebar}>
        <Link className="text-white " to="/me/my-drive">
          <button
            type="button"
            className="btn-primary btn-lg"
            style={{ textAlign: "start", width: "100%" }}
          >
            My Drive
          </button>
        </Link>
        <Link className="text-white " to="/me/starred">
          <button
            type="button"
            className="btn-primary btn-lg"
            style={{ textAlign: "start", width: "100%" }}
          >
            <BsStar size={20} className="mx-2" />
            Starred
          </button>
        </Link>
        <Link className="text-white " to="/me/bin">
          <button
            type="button"
            className="btn-primary btn-lg"
            style={{ textAlign: "start", width: "100%" }}
          >
            <BsFillTrashFill size={20} className="mx-2" />
            Bin
          </button>
        </Link>
        <hr />
        <DownloadProgressBar />
      </div>
    </div>
  );
};

export default SideBar;
