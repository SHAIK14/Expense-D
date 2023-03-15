import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Authcontent } from "./store/Authcontext";

export const Navbars = () => {
  const ctx = useContext(Authcontent);
  const logined = ctx.islogined;
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            {!logined && (
              <Link
                to="/signup"
                className="nav-link"
                style={{ textDecoration: "none", color: "white" }}
              >
                Signup
              </Link>
            )}
            {!logined && (
              <Link
                to="/login"
                className="nav-link"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            )}
            {logined && (
              <Link
                to="/welcome"
                className="nav-link"
                style={{ textDecoration: "none", color: "white" }}
              >
                Welcome
              </Link>
            )}
            {logined && (
              <Link
                to="/logout"
                className="nav-link"
                style={{ textDecoration: "none", color: "white" }}
              >
                Logout
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
