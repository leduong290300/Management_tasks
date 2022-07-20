export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api/v1"
    : "https://management-tasks-app.herokuapp.com/api/v1";
