import React from "react";
import Routers from "./router/router";
import "./App.css";
import AuthContextProvider from "./context/authContext";
export default function App() {
  return (
    <AuthContextProvider>
      <Routers />
    </AuthContextProvider>
  );
}
