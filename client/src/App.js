import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Protected from "./router/protected";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import "./App.css";

import AuthContextProvider from "./context/authContext";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Protected exact path="/" component={Dashboard} />
          <Route
            exact
            path="/login"
            render={(props) => <Home {...props} route="/login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Home {...props} route="/register" />}
          />
          <Route
            exact
            path="/forgot_password"
            render={(props) => <Home {...props} route="/forgot_password" />}
          />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
