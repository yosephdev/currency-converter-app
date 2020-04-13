import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";

function TopBar({ location }) {
  const { pathname } = location;

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home"> Currency Exchange App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/" active={pathname === "/"}>
            Home
          </Nav.Link>
          <Nav.Link
            href="/rates"
            active={pathname.includes("/rates")}>
            Current Rates
          </Nav.Link>
          <Nav.Link
            href="/historicrates"
            active={pathname.includes("/historicrates")}>
            Historic Rates
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}


export default withRouter(TopBar);