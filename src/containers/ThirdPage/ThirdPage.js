import React, {Fragment} from 'react';
import './ThirdPage.css';

import Navbar from '../../components/Navbar/Navbar';
import Currency from '../../components/Currency/Currency';
import Api from '../../components/Api/Api';
import Photo from '../../components/Images/Images';
import About from '../../components/About/About';
import Footer from '../../components/Footer/Footer';


const SecondPage = (props) => {

  return (
    <Fragment>
      <div className="header">
        <Navbar />

        <div className="currency">
        <div className="container">
            <Currency />         
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
