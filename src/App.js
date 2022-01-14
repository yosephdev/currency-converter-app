import React from "react";
import { Router, Route, Link } from "react-router-dom";
import "./App.css";

import HomePage from "./components/HomePage/HomePage";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import {createBrowserHistory as createHistory } from "history";
import RatesPage from './components/RatesPage/RatesPage';
const history = createHistory();

function App() {


  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HomePage} />        
        <Route path="/rates" exact component={RatesPage} />              
      </Router>
      <Footer /> 
    </div>
  );
}

export default App;
