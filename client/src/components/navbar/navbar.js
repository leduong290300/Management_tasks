import React, { useContext, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import "./navbar.css";
import logoutIcon from "../../assets/icons/logout.svg";

export default function NavBar() {
  //* Get Context
  const {
    authState: { user },
  } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="align-items-center justify-content-between"
        >
          <Nav className="mr-auto">
            <Nav.Link className="font-weight-bolder " to="/" as={Link}>
              Trang chủ
            </Nav.Link>
            <Nav.Link className="font-weight-bolder " to="/about" as={Link}>
              Thông tin
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Nav.Link className="font-weight-bolder " disabled>
              Xin chào ,
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder "
              size="sm"
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="30"
                height="30"
                className="mr-2"
              />
              Đăng xuất
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
