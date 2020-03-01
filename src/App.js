import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import FirstPage from './containers/FirstPage/FirstPage';
import SecondPage from './containers/SecondPage/SecondPage';
import ThirdPage from './containers/ThirdPage/ThirdPage';


const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <FirstPage />
        </Route>
        <Route exact path='/convert'>
          <SecondPage />
        </Route>
        <Route path='/rates'>
          <ThirdPage />
        </Route>
      </Switch>
    </Router>
  );
}


export default App;


