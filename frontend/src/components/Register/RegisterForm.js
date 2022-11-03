import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Card from "../../ui/Card";
import { useContext, useRef, useState } from "react";
import classes from "./Register.module.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Navigation from "../Navbar/navigation";
import cancelImage from "../../asset/cancel1.png";

function Register() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const url = "https://drive-clone-avinash.herokuapp.com/users";
  const urlNewUser = "https://drive-clone-avinash.herokuapp.com/upload";
  const [cookies, setCookie] = useCookies(["user"]);
  const { state, dispatch } = useContext(UserContext);
  const [errorAccure, setErrorAccure] = useState();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enterdName = nameInputRef.current.value;
    const enterdEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;
    try {
      axios
        .post(url, {
          name: enterdName,
          email: enterdEmail,
          password: enterdPassword,
        })
        .then(async (res) => {
          console.log(res.data.user._id);
          setCookie("token", res.data.token, {
            path: "/",
            maxAge: 12 * 60 * 60,
          });
          const ans = await axios
            .post("https://drive-clone-avinash.herokuapp.com/createFolder", {
              Authorization: `Bearer ${res.data.token}`,
              FolderName: "MyDrive/",
            })
            .then((res) => {
              console.log("MyDriveCreatrd");
            })
            .catch((error) => {
              console.log(error);
            });
          const ans1 = await axios
            .post("https://drive-clone-avinash.herokuapp.com/createFolder", {
              Authorization: `Bearer ${res.data.token}`,
              FolderName: "Bin/",
            })
            .then((res) => {
              console.log("binCreatrd");
            })
            .catch((error) => {
              console.log(error);
            });
          dispatch({ type: "USER", payload: true });
          navigate("/");
        })
        .catch((error) => {
          setErrorAccure("user already exists");
        });
    } catch (error) {
      setErrorAccure("server not responding");
    }
  };

  return (
    <div>
      <Navigation />
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
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
          <h1 className={classes.heding}>Register</h1>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              required
              id="name"
              ref={nameInputRef}
              placeholder="enter name"
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              ref={emailInputRef}
              placeholder="enter email"
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              ref={passwordInputRef}
              placeholder="enter password"
            />
          </div>
          <Link className="nav-link" style={{ margin: "-2%" }} to="/login">
            <p>Login</p>
          </Link>
          <div className={classes.action}>
            <button className={classes.btn}>Register</button>
          </div>
          <p style={{ textAlign: "center", color: "red", margin: "5px" }}>
            {errorAccure}
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Register;
