import React from 'react';
import './Main.css';
import {Link} from 'react-router-dom';

const Main = () => {
  return (
    <div className="mainText">
      <div className="container">
        <h1>Currency Converter</h1>
        <p>I build this currency exchange rates listing website as part of a ReactJS Development course at Altcademy. You can browse and navigate to this website to convert currencies.</p>
        <Link to='/convert'>
          <button>Convert</button>
        </Link>
      </div>
    </div>
  )
}

export default Main