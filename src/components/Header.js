import React from 'react';
import '../css/Header.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
/* import { withRouter } from "react-router-dom"; */


function Header(props) {
  const {application, pathname} = props;

  return (
    <React.Fragment>
      <header className="App-header">        
        <Navbar bg="dark-navy" expand="lg" variant="dark">
          <Navbar.Brand href="/"> {application} </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/" active={pathname === "/"}>                
              </Nav.Link>              
            </Nav>
          </Navbar.Collapse>
        </Navbar>        
      </header>      
    </React.Fragment>
  );

}

export default Header;
