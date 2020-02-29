import React, {Fragment} from 'react';
import './SecondPage.css';

import Navbar from '../../components/Navbar/Navbar';
import Converter from '../../components/Converter/Converter';
import Api from '../../components/Api/Api';
import Photo from '../../components/Images/Images';
import About from '../../components/About/About';
import Footer from '../../components/Footer/Footer';

const SecondPage = (props) => {

  return (
    <Fragment>
      <div className="header">
        <Navbar />
        <div className='body'>
          <div className='container'>
          < Converter />
        </div>
      </div>
      </div>
      <Api />
      <Photo />
      <About />
      <Footer />
    </Fragment>
  )
}
  

export default SecondPage

