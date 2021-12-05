import React, { useState, useEffect } from "react";
import axios from "axios";

function Task({ admin, item, deleteTasks, userItem, deleteTask, updateTask }) {
  const [update, setUpdate] = useState(false);

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
        <li key={userItem._id}>
          {userItem.name}
          {update && (
            <form
              onSubmit={(e) => {
                updateTask(e, userItem._id);
                setUpdate(false);
              }}
            >
              <input type="text" name="newTaskVal"/>

              <input type="submit" value="Done" />
            </form>
          )}
          {!update && <button onClick={() => setUpdate(!update)}>edit</button>}
          <button onClick={() => deleteTask(userItem._id)}>delete</button>
        </li>
      )}
    </>
  );
}

export default Task;
