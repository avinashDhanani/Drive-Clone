import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "./User.module.css";
import { Link } from "react-router-dom";
import userIcon from "../../asset/user2.jpg";


function UserLogo() {
  return (
    <button type="button" className="btn m-3">
      <Link className="nav-link  text-white" to="/user">
        <img src={userIcon} className={classes.logoUser} alt="logo" />
      </Link>
    </button>
  );
}
export default UserLogo;
