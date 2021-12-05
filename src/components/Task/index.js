import React, { useState, useEffect } from "react";
import axios from "axios";

function Task({ admin, item, deleteTasks }) {
  return (
    <>
      {admin ? (
        <>
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteTasks(item._id)}>delete</button>
          </li>
        </>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );
}

export default Task;
