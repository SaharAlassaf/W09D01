import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tasks from "../Tasks";
import Dashboard from "../Dashboard";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setAdmin(localStorage.getItem("admin"));
    signin();
  }, []);

  const signin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`, {
        email,
        password,
      });
      //   console.log(res.data);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      if (res.data.result.role.role === "admin") {
        localStorage.setItem("admin", res.data.result.role.role);
        setAdmin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!token ? (
        <>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signin}>Sign in</button>
        </>
      ) : (
        <>
          {admin ? (
            <Link to="/Dashboard">
              <buttoun>Dashboard</buttoun>
            </Link>
          ) : (
            <Link to="/Tasks">
              <buttoun>Tasks</buttoun>
            </Link>
          )}
        </>
      )}
    </>
  );
}

export default Signin;
