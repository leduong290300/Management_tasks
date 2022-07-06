import React, { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";

import LoginForm from "../components/form/login";
import RegisterForm from "../components/form/register";
import ForgotPasswordForm from "../components/form/forgotpassword";

import { AuthContext } from "../context/authContext";

export default function Home({ route }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) return <Redirect to="/" />;
  else
    body = (
      <>
        {route === "login" && <LoginForm />}
        {route === "register" && <RegisterForm />}
        {route === "forgot_password" && <ForgotPasswordForm />}
      </>
    );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Quản lý công việc</h1>
          <h4>Thêm những công việc bạn cần làm</h4>
          {body}
        </div>
      </div>
    </div>
  );
}
