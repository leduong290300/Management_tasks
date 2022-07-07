import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Form className="mt-3">
      <Form.Group className="mb-3">
        <Form.Label className="text-white d-flex justify-content-start">
          Họ
        </Form.Label>
        <Form.Control type="text" placeholder="Nguyen" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-white d-flex justify-content-start">
          Tên
        </Form.Label>
        <Form.Control type="text" placeholder="An" />
      </Form.Group>

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

      <Form.Group className="mb-3">
        <Form.Label className="text-white d-flex justify-content-start">
          Nhập lại mật khẩu
        </Form.Label>
        <Form.Control type="password" placeholder="******" />
      </Form.Group>

      <div className="action mb-3">
        <div className="action_check">
          <Button variant="primary" type="submit">
            Đăng ký
          </Button>
        </div>
        <div className="action_link">
          <Link to="/login">
            <span className="login">Đã có tài khoản?</span>
          </Link>
        </div>
      </div>
    </Form>
  );
}
