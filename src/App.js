import React from 'react';
import { Router, Route } from "react-router-dom";
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Container from './components/Container';
import LoadingInput from './components/LoadingInput';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import LoadData from './utils/LoadData';
import Footer from './components/Footer';
import { createBrowserHistory as createHistory } from "history";
const history = createHistory();



function App() {
  const applicationName = 'Currency Converter v2';
  document.querySelector('title').textContent = applicationName;

  const api = 'https://altexchangerateapi.herokuapp.com/latest'

  const [base, setBase] = useState('EUR');
  const [currencyList, setCurrencyList] = useState();
  const [baseCurrency, setBaseCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  const init = (result) => {
    
        setCurrencyList(result);
        setBaseCurrency(result.base);
        setToCurrency(!toCurrency ? Object.keys(result.rates)[0] : toCurrency);

  }
  
  // const loadData = async () => {
  //   let result = await axios(
  //     `${api}?from=${base}`
  //   );

  //   result = JSON.parse(result.request.responseText);
  // }

  useEffect( () => {
    LoadData(`${api}?from=${base}`, init);
  }, [base]);

  const updateBaseCurrency = (baseCurrency) => {
    setBase(baseCurrency);
    console.log(baseCurrency);
    setTimeout(() => LoadData.bind(this, [`${api}?from=${base}`, init]), 350);
  }

  const updateToCurrency = (toCurrency) => {
    setToCurrency(toCurrency);
    // setCurrencyList(null);
    setTimeout(() => LoadData.bind(this, [`${api}?from=${base}`, init]), 350);
  }

  if (!currencyList) return <LoadingInput />

  // TODO: need to adjust output to be mobile friendly
  return (
    <div className="App">      
      <Router history={history}>
        <Header application={applicationName} links={'list-object to be populated'} />
        <Route path="/" exact component={Header} />
        <Route path="/tables" exact component={Container} />
        <Route path="/graphs" exact component={Container} />
      </Router>
      <Container 
        currencyList={currencyList} 
        baseCurrency={baseCurrency}
        toCurrency={toCurrency}
        updateBaseCurrency={updateBaseCurrency}
        updateToCurrency={updateToCurrency}
      />
      <Footer />
    </div>
  );
}

export default App;
