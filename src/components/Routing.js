import React from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import CurrencyConverterPage from "./CurrencyConverterPage";
import CurrencyExchangePage from "./CurrencyExchangePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faGithubAlt, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import logo from "../styles/images/favicon.ico";
import "../styles/style.css";

const NotFound = () => <h3>404 Sorry, this page was not found</h3>;

const Routing = () => {
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" className="nav-bar custom-navbar">
        <NavbarBrand className="custom-navbar-brand">
          <NavLink to="/" id="nav-links" className="custom-nav-link">
            <FontAwesomeIcon icon={faHandHoldingUsd} className="coin-icon" />
            <span className="brand custom-brand">CurrencyXchange</span>
          </NavLink>
        </NavbarBrand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="custom-navbar-toggle"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink
              to="/currency-converter"
              className="nav-link"
              
            >
              Currency Converter
            </NavLink>
            <NavLink
              to="/exchange-rates"
              className="nav-link"
              
            >
              Exchange Rates
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<CurrencyConverterPage />} />
        <Route path="/currency-converter" element={<CurrencyConverterPage />} />
        <Route path="/exchange-rates" element={<CurrencyExchangePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer id="footer" className="container-fluid">
        <div className="row py-3 mx-xl-4 px-xl-4">
          <div className="col-12 d-flex flex-column flex-md-row justify-content-evenly justify-content-md-between px-md-5 px-xl-0">
            <a
              href="https://yoseph.dev"
              target="_blank"
              rel="noreferrer noopener"
              className="order-2 order-md-1 ms-2 my-2"
            >
              <img src={logo} alt="yb logo" width="30" /> built by Yoseph
              Berhane
            </a>
            <div className="d-flex align-self-center footer-brand order-1 order-md-2 pb-3">
              <FontAwesomeIcon icon={faHandHoldingUsd} className="coin-icon" />
              <span className="brand fw-bold ms-2 ps-1">CurrencyXchange</span>
            </div>
            <div className="d-flex order-3 my-2 me-3">
              <a
                href="https://www.linkedin.com/in/yosephbet/"
                target="_blank"
                className="ms-3"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://github.com/yosephdev"
                target="_blank"
                className="ms-3"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithubAlt} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Router>
  );
};

export default Routing;