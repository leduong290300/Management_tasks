import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../container/layouts/main";
import AuthContextProvider from "../context/authContext";

//*Views
import Login from "../container/views/login/login";
import Register from "../container/views/register/register";
import ForgotPassword from "../container/views/forgot/forgot";
import Dashboard from "../container/views/dashboard/dashboard";
import About from "../container/views/about/about";

//* Protect router
import Protected from "./protected";

export default function Routers() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Protected exact path="/" component={Dashboard} />
          <Route path="/about" exact component={About} />
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
    </AuthContextProvider>
  );
}
