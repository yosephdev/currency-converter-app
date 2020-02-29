import React, {Fragment} from 'react';
import './FirstPage.css';

import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import Api from '../../components/Api/Api';
import Photo from '../../components/Images/Images';
import About from '../../components/About/About';
import Footer from '../../components/Footer/Footer';

const FirstPage = () => {
  return (
    <Fragment>
      <div className="header">
        <Navbar />
        <Main />
      </div>
      <Api />
      <Photo />
      <About />
      <Footer />
    </Fragment>
  )
}
export default FirstPage
