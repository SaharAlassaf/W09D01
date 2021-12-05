import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tasks from "../Tasks";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    signup();
  }, []);

  const signup = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
        email,
        password,
      });
      //   console.log(res);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!token ? (
        <>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
            <button onClick={signup}>Sign up</button>
        </>
      ) : (
        <>
          <Tasks token={token}/>
        </>
      )}
    </>
  );
}

export default Signup;
