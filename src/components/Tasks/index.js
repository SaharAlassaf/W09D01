import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Landing from "../Landing";
import Task from "../Task";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async (e) => {
    try {
      let name = e.target.newTaskVal.value;

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/createTask`,
        { name },
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

  const getTasks = async () => {
    const storage = localStorage.getItem("token");
    setToken(storage);
    const isAdmin = localStorage.getItem("admin");
    setAdmin(isAdmin);

    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/`, {
        headers: { Authorization: `Bearer ${storage}` },
      });
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (e, id) => {
    try {
      e.preventDefault();
      let name = e.target.newTaskVal.value;

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/updateTask/${id}`,
        { name },
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

  const deleteTask = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteTask/${id}`,
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
  };

  return (
    <>
      {token ? (
        <>
          <form
            onSubmit={(e) => {
              addTask(e);
            }}
          >
            <input type="text" name="newTaskVal" />

            <input type="submit" value="Add" />
          </form>
          <ul>
            {tasks.map((item) => (
              <Task
                key={item._id}
                userItem={item}
                admin={admin}
                deleteTask={deleteTask}
                updateTask={updateTask}
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

export default Tasks;
