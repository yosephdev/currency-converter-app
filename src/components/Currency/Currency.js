import React, { Component } from "react";

import "./Currency.css";

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {}
    };
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=EUR") 
      .then(res => res.json()) 
      .then(
        result => {
          this.setState({
            isLoaded: true,
            rates: result.rates
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  primeCurrency = (crr, action) => {
    if (action === 0) {
      crr = (crr * 102) / 100;
    } else if (action === 1) {
      crr = (crr * 98) / 100;
    } else {
      // Do nothing...
    }
    var fixedCrr = crr.toFixed(4).toString();
    while (fixedCrr.length < 8) {
      fixedCrr = "0" + fixedCrr;
    }

    return fixedCrr;
  };

  createTable = () => {
    const rates = this.state;
    let ratesArr = Object.keys(rates).map(i => rates[i])[2];
    let table = [];
    let children = [];
    let displayedCurrencies = ["GBP", "RUB", "CAD", "USD", "CHF", "JPY", "EUR", "CNY", "HKD", "INR"];
    
    for (var key in ratesArr) {
      if (ratesArr.hasOwnProperty(key) && displayedCurrencies.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.primeCurrency(ratesArr[key], 0)}</td>
            <td>{this.primeCurrency(ratesArr[key])}</td>
            <td>{this.primeCurrency(ratesArr[key], 1)}</td>
          </tr>
        );
      }
    }
    table.push(<tbody>{children}</tbody>); 

    return table;
  };

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <div className="currency">
            <table className="currencyTable">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>BUY</th>
                  <th>RATE</th>
                  <th>SELL</th>
                </tr>
              </thead>
              {this.createTable()}
            </table>
            <p>
              * base currency is EUR              
            </p>
          </div>
        </main>
      );
    }
  }
}

export default Currency;
