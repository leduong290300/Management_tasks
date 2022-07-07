import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <Form className="mt-3">
      <Form.Group className="mb-3">
        <Form.Label className="text-white d-flex justify-content-start">
          Email
        </Form.Label>
        <Form.Control type="email" placeholder="example@gmail.com" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-white d-flex justify-content-start">
          Mật khẩu
        </Form.Label>
        <Form.Control type="password" placeholder="******" />
      </Form.Group>
      <div className="action mb-3">
        <div className="action_check">
          <Form.Group>
            <Form.Check
              className="text-white "
              type="checkbox"
              label="Ghi nhớ đăng nhập"
            />
          </Form.Group>
        </div>
        <div className="action_link">
          <Link to="/register">
            <span className="register">Đăng ký</span>
          </Link>
          <Link to="/forgot_password">
            <span className="forgot">Quên mật khẩu?</span>
          </Link>
        </div>
      </div>
      <Button variant="primary" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
}
