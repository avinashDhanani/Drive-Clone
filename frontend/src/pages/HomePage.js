import { Button } from "bootstrap";
import React from "react";
import classes from "./HomePage.module.css";
import { Link } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import imageClouad from "../asset/unnamed.jpg";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Navigation from "../components/Navbar/navigation";
import Footer from "../components/Footers/footers";

function HomePage() {
  return (
    <>
      <Navigation />  
      <div className={classes.mainHeading}>
        <div className={classes.mainHeadingText}>
          <div>
            <h1>
              Easy and secure <br />
              access to all of your <br />
              content
            </h1>
            <p>you can store 1 GB data Online</p>
          </div>
          <div className={classes.twoButtonInline}>
            <Link to="/login">
              <Login />
            </Link>

            <Link to="/register">
              <Register />
            </Link>
          </div>
        </div>
        <div className={classes.imagHeadingImage}>
          <img
            src={imageClouad}
            className={classes.logo}
            width="700px"
            height="450px"
          />
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default HomePage;
