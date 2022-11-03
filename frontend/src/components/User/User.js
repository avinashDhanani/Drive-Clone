import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Card from "../../ui/Card";
import { useCallback, useRef, useState, useContext } from "react";
import classes from "./User.module.css";
import imageUser from "../../asset/user2.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useCookies } from "react-cookie";
import Navigation from "../Navbar/navigation";
import cancelImage from "../../asset/cancel1.png";

function User() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const accessToken = cookies.token;
  getData();
  function getData() {
    const url = "https://drive-clone-avinash.herokuapp.com/users/me";
    try {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
        })
        .catch((error) => {
          console.log("please enter valid email and password catch" + error);
        });
    } catch (error) {
      console.log("please enter valid email and password true");
    }
  }

  const logout = async () => {
    const urlLogout = "https://drive-clone-avinash.herokuapp.com/users/logout";
    // event.preventDefault();
    try {
      await axios
        .post(urlLogout, {
          Authorization: `Bearer ${accessToken}`,
        })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "USER", payload: false });
          removeCookie("token");
          navigate("/");
        })
        .catch((error) => {
          removeCookie("token");
          dispatch({ type: "USER", payload: false });
          console.log("please enter valid email and password catch" + error);
        });
    } catch (error) {
      removeCookie("token");
      dispatch({ type: "USER", payload: false });
      console.log("please enter valid email and password true");
    }
    dispatch({ type: "USER", payload: false });
    removeCookie("token");
    navigate("/");
  };
  return (
    <>
      <Navigation />
      <Card>
        <form className={classes.form}>
          <div className={classes.imageUserCancel}>
            <Link to="/">
              <img
                src={cancelImage}
                alt="user photo"
                width="15px"
                height="15px"
              />
            </Link>
          </div>
          <div className={classes.imageUser}>
            <img
              src={imageUser}
              alt="user photo"
              width="100px"
              height="100px"
            />
            <h5>{name}</h5>
          </div>
          <div>
            <p>
              <b>Name : </b>
              {name}
            </p>
          </div>
          <div>
            <p>
              <b>Email : </b>
              {email}
            </p>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn mt-2  btn-primary btn-md"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default User;
