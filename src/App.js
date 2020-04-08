import React from "react";
import { Router, Route, Link } from "react-router-dom";
import "./App.css";

import HomePage from "./components/HomePage/HomePage";
import TopBar from "./components/TopBar/TopBar";
import RatesPage from "./components/RatesPage/RatesPage";
import Footer from "./components/Footer/Footer";
import {createBrowserHistory as createHistory } from "history";
import HistoricRatesPage from './components/HistoricRatesPage/HistoricRatesPage';
const history = createHistory();

function App() {


  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HomePage} />
        <Route path="/rates" exact component={RatesPage} />
        <Route path="/historicrates" exact component={HistoricRatesPage} />              
      </Router>
      <Footer /> 
    </div>
  );
}

export default App;
<<<<<<< HEAD



=======
>>>>>>> 72adad96f214f0adf13da7b7f517cc53cb7eb307
