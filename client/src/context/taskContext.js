import { createContext, useReducer, useState } from "react";
import { taskReducer } from "../reducer/taskReducer";
import axios from "axios";
import { apiUrl } from "../config/connectServer";

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  //* State
  const [taskState, dispatch] = useReducer(taskReducer, {
    task: null,
    tasks: [],
    tasksLoading: true,
  });

  //* Lấy tất cả bài viết
  const handleGetAllTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/all`);
      if (response.data.success) {
        dispatch({ type: "LOAD_SUCCESS", payload: response.data.results });
      }
    } catch (error) {
      dispatch({ type: "LOAD_FAILED" });
    }
  };

  const taskContextData = { handleGetAllTasks, taskState };
  return (
    <TaskContext.Provider value={taskContextData}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskContextProvider;
