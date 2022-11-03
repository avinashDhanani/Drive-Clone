import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Card from "../../ui/Card";
import { useContext, useRef, useState } from "react";
import classes from "./Login.module.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import {UserContext} from "../../App"
import { useCookies } from "react-cookie";
import Navigation from "../Navbar/navigation";
import cancelImage from "../../asset/cancel1.png";

function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const url = "https://drive-clone-avinash.herokuapp.com/users/login";
  const navigate = useNavigate();
  
  const [cookies, setCookie] = useCookies(["user"]);
  const {state,dispatch} = useContext(UserContext)
  const [errorAccure, setErrorAccure] = useState();

  function submitHandler(event) {
    event.preventDefault();
    const enterdEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;
    try {
      axios
        .post(url, {
          email: enterdEmail,
          password: enterdPassword,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.token)
          setCookie("token", res.data.token, {
            path: "/",
            maxAge: 12*60*60,
          });
          dispatch({type:"USER",payload:true})
          navigate("/");
        })
        .catch((error) => {
          setErrorAccure("email or password invalid");
        });
    } catch (error) {
       setErrorAccure("server not responding");
    }
  }
  return (
    <>
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
          <h1 className={classes.heding}>Log In</h1>
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
          <Link className="nav-link" style={{"margin":"-5%"}} to="/register">
            <p>Register</p>
          </Link>
          <div className={classes.action}>
            <button className={classes.btn}>Log In</button>
          </div>
          <p style={{ "textAlign": "center", "color": "red", "margin": "5px" }}>
            {errorAccure}
          </p>
        </form>
      </Card>
    </>
  );
}

export default Login;
