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
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
            <button onClick={signin}>Sign in</button>
        </>
      ) : (
        <>{admin ? <Dashboard token={token} /> : <Tasks token={token} />}</>
      )}
    </>
  );
}

export default Signin;
