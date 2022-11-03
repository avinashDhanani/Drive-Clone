import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <button type="button" className="btn mt-2 m-2 btn-primary btn-sm">
      <Link className="nav-link  text-white" to="/register">
        Register
      </Link>
    </button>
  );
}
export default Register;
