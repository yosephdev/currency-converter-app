import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default App;
