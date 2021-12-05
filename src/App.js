import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Tasks from "./components/Tasks";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/Signin" element={<Signin />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/Tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
