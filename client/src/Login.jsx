import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Login = () => {
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    try {
      await axios
        .post("http://localhost:3000/api/login", userData)
        .then((res) => {
          console.log("login successful");
          const token = res.data.token;
          Cookies.set("jwt_token", token);
          const get = Cookies.get("jwt_token");
          console.log(get);
        })
        .catch((err) => {
          console.log("not login", err);
        });
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div className="AddUser">
      <Link to={"/"}>Back</Link>
      <h1>login</h1>
      <form onSubmit={handleForm}>
        <div className="inputGroup"></div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="textpassword"
            name="pass"
            id="pass"
            placeholder="Password"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
