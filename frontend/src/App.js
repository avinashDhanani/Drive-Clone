import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import Register from "./components/Register/RegisterForm";
import User from "./components/User/User";
import HomePage from "./pages/HomePage";
import RecycleBin from "./components/RecycleBin/RecycleBin";
import { createContext, useReducer } from "react";
import { useCookies } from "react-cookie";
import { initialState, reducer } from "./reducer/UseReducer";
import Starred from "./components/Starred/Starred";
import MyDrive from "./components/MyDrive/MyDrive";
import UploadFiles from "./components/MyDrive/UploadFiles";

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cookies, setCookie] = useCookies();

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routes>
          {!cookies.token ? (
            <Route path="/" element={<HomePage />} />
          ) : (
            <Route path="/" element={<MyDrive />} />
          )}

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/me/bin" element={<RecycleBin />} />
          <Route path="/me/starred" element={<Starred />} />
          <Route path="/me/my-drive" element={<MyDrive />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
