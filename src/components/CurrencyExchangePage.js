import React, { useEffect, useState } from "react";
import { checkStatus, json } from "./utils";
import CurrencySelector from "./CurrencySelector"; 
import CurrencyExchangeTable from "./CurrencyExchangeTable.js"; 

const CurrencyExchangePage = () => {
  // set states for selected base amount and currency and exchange rate data
  const [amount, setAmount] = useState("1");
  const [base, setBase] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState([]);
  const amountNumber = parseFloat(amount);

  // request for exchange rates and updating state
  const fetchRates = () => {
    fetch(`https://api.frankfurter.app/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then((response) => {
        const newRates = Object.keys(response.rates).map((key) => {
          return { code: key, value: response.rates[key] };
        });
        setExchangeRates(newRates);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handlers

  //change base currency on option change
  const handleBase = (e) => {
    setBase(e.target.value);
  };

  useEffect(() => {
    fetchRates();
  }, [base]);

  //change base amount on input change
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  //set default exchange rates with £1 GBP
  const initialRates = () => {
    fetchRates();
  };

  useEffect(() => {
    initialRates();
  }, []);

  // className order = bootstrap classes, my custom classes, margin/padding xs, m/p md, m/p lg
  return (
    <div className="container-fluid">
      <div id="exchange-page" className="row pb-5 px-4 px-md-5">
        <div className="col-12 d-flex justify-content-center my-3 my-md-4 mb-xl-0">
          <h1 className="fw-bold p-2 pb-xl-1">Currency Exchange Rates</h1>
        </div>

        <div className="col-12">
          <div className="row justify-content-evenly justify-content-md-end justify-content-xl-evenly exchange-block p-2 py-md-4 py-xl-0">
            <div
              id="base"
              className="col-12 col-md-4 col-xl-10 d-flex flex-column base-wrapper mb-3 pb-4 px-sm-5 pb-md-0 px-md-3 m-xl-0 p-xl-0"
            >
              <p className="align-self-center align-self-xl-start fw-light mt-3 mb-0 p-xl-2 px-xl-4">
                Base Currency
              </p>
              <div className="d-xl-flex base-block my-3">
                <div className="input-border my-3 p-1 my-md-2 my-xl-0 py-xl-0 order-xl-2 px-xl-4">
                  <input
                    className="form-control number-input my-md-3 my-xl-2 text-center text-xl-start"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={handleAmount}
                  ></input>
                </div>
                <CurrencySelector
                  name="exchangeOptions"
                  value={base}
                  handleCurrencyChange={handleBase}
                />
              </div>
            </div>

            <div className="col-12 col-md-7 col-xl-10 table-wrapper p-0 p-md-3 pb-xl-5 mb-xl-5">
            <CurrencyExchangeTable exchangeRates={exchangeRates} base={base} amount={amountNumber} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchangePage;
