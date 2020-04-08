import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";


function Footer() { 

  return (
    <div className="footer">
      <footer className="p-3 bg-dark">
        <div className="mb-2">
          <a className="badge badge-light" href="https://github.com/Altcademy/exchange-rate-site" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div>
          <span className="mr-3 text-info">Built by <a href="#" target="_blank" rel="noopener noreferrer">Yoseph Berhane</a></span>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
