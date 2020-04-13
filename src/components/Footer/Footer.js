import React from 'react';
import './Footer.css';


function Footer() {

  return (
    <div className="footer">
      <footer className="p-1 bg-dark">
        <div className="mb-2">
          <a className="badge badge-light" href="https://github.com/isakbet" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div>
          <span className="mr-3 text-warning">Built by <a href="https://isakbet.github.io/Personal-Portfolio/" target="_blank" rel="noopener noreferrer">Yoseph Berhane</a></span>
        </div>
      </footer>
    </div>
  )
}

export default Footer;