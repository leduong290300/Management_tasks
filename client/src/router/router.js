import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../container/layouts/main";
import AuthContextProvider from "../context/authContext";
import TaskContextProvider from "../context/taskContext";

//*Views
import Login from "../container/views/login/login";
import Register from "../container/views/register/register";
import ForgotPassword from "../container/views/forgot/forgot";
import Dashboard from "../container/views/dashboard/dashboard";
import About from "../container/views/about/about";
import Store from "../container/views/store/store";

//* Protect router
import Protected from "./protected";

export default function Routers() {
  return (
    <AuthContextProvider>
      <TaskContextProvider>
        <Router>
          <Switch>
            <Protected exact path="/" component={Dashboard} />
            <Route path="/about" exact component={About} />
            <Protected path="/store" exact component={Store} />
            <Route>
              <Main>
                <Switch>
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/forgot_password" component={ForgotPassword} />
                </Switch>
              </Main>
            </Route>
          </Switch>
        </Router>
      </TaskContextProvider>
    </AuthContextProvider>
  );
}
