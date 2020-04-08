<<<<<<< HEAD
import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';


const Footer = () => {
  return (
    <div className="footer">
      <div className="my_website">
        <Link to='/'>
          <p>aizanamida.com</p>
        </Link>
      </div>
      <div className="social_media">
        <a href="https://github.com/isakbet" target='_blank'>
          <img src="./img/github.png" alt=""/>
        </a>
        <a href="https://www.linkedin.com/in/yosephberhane/" target='_blank'>
          <img src="./img/linkedin.png" alt=""/>
        </a>
        <a href="https://www.youtube.com/channel/UCJtJxHEctv6_c-OsoKbZNEQ" target='_blank'>
          <img src="./img/youtube.png" alt=""/>
        </a>
        <a href="https://twitter.com/aizanamida" target='_blank'>
          <img src="./img/twitter.png" alt=""/> 
        </a>
      </div>
    </div>
  )
}

export default Footer
=======
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
>>>>>>> 72adad96f214f0adf13da7b7f517cc53cb7eb307
