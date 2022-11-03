import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import classes from "./navigation.module.css";
import logo from "../../asset/google-logo-png.png";
import { useCookies } from "react-cookie";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { UserContext } from "../../App";
import UserLogo from "../User/UserLogo";

function Navigation(props) {
  const [cookies, setCookie] = useCookies();
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (!state && !cookies.token) {
      return (
        <>
          <div className={classes.navBackground}>
            <ul className="nav justify-content-end">
              <li className="nav-item ">
                <img src={logo} className={classes.logo} alt="logo" />
              </li>
              <li className="nav-item">
                <Login />
              </li>
              <li className="nav-item">
                <Register />
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={classes.navBackground}>
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <img src={logo} className={classes.logo} alt="logo" />
              </li>
              <li className="nav-item">
                <UserLogo/>
              </li>
            </ul>
          </div>
        </>
      );
    }
  };
  RenderMenu();
  return (
    <div>
      <header>
        <RenderMenu />
      </header>
    </div>
  );
}

export default Navigation;
