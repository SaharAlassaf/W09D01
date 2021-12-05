import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Landing from "../Landing";
import Task from "../Task";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const storage = localStorage.getItem("token");
    setToken(storage);
    const isAdmin = localStorage.getItem("admin");
    setAdmin(isAdmin);

    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${storage}` },
      });
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const deleteTasks = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/delatedTasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
  }

  return (
    <>
      {token ? (
        <>
          <ul>
            {tasks.map((item) => (
              <Task
                key={item._id}
                item={item}
                admin={admin}
                deleteTasks={deleteTasks}
              />
            ))}
          </ul>
          <Link to="/">
          <button onClick={logout}>log out</button>
          </Link>
        </>
      ) : (
        <Landing />
      )}
    </>
  );
}

export default Dashboard;
