import React, { useState, useEffect } from "react";
import { checkStatus, json } from "./utils";
import CurrencySelector from "./CurrencySelector";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Chart from "./Chart";


const CurrencyConverterPage = () => {
  const [input, setInput] = useState("1");
  const [output, setOutput] = useState("");
  const [currencyInput, setCurrencyInput] = useState("USD");
  const [currencyOutput, setCurrencyOutput] = useState("SEK");
  const [buttonClick, setButtonClick] = useState(false);

  const handleInput = (event) => {
    const newInput = event.target.value;
    setInput(newInput);
    if (currencyInput === currencyOutput) {
      setOutput(newInput);
    } else if (buttonClick) {
      setOutput(newInput);
    }
  };

  const handleCurrencyChange = (event) => {
    const { id, value } = event.target;
    if (id === "currencies-in") setCurrencyInput(value);
    if (id === "currencies-out") setCurrencyOutput(value);
  };

  const handleButton = () => {
    setCurrencyInput(currencyOutput);
    setCurrencyOutput(currencyInput);
    setButtonClick(!buttonClick);
  };

  useEffect(() => {
    if (currencyInput === currencyOutput) {
      $("#diff-currencies").removeClass("visually-hidden");
      return;
    }
    $("#diff-currencies").addClass("visually-hidden");
    const url = `https://api.frankfurter.app/latest?amount=${
      buttonClick ? output : input
    }&from=${currencyInput}&to=${currencyOutput}`;
    fetch(url)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        const rate = data.rates[currencyOutput];
        buttonClick ? setInput(rate) : setOutput(rate);
      })
      .catch(console.log);
  }, [input, output, currencyInput, currencyOutput, buttonClick]);

  return (
    <div className="container-fluid">
      <div id="converter-page" className="row px-2 pb-5 px-md-5">
        <div className="col-12 d-flex justify-content-center my-3 mx-0 my-md-4 ">
          <h1 className="fw-bold p-2">currency converter</h1>
        </div>

        <div className="col-12 p-0">
          <div className="row flex-column align-items-center converter-block m-4 my-1 px-3 py-5 px-sm-5 flex-md-row m-md-0 px-md-3 px-lg-5 justify-content-xl-evenly p-xl-0">
            {/** input amount of currency one **/}
            <div
              id="input-block"
              className="col-12 col-md-5 d-flex flex-column align-items-center "
            >
              <p className="fw-light">from</p>
              <input
                value={buttonClick ? output : input}
                onChange={handleInput}
                id="amount-input"
                className="form-control text-center number-input mb-3 ps-4 my-md-3"
                type="number"
                min="1"
              ></input>
              <CurrencySelector
                id="options"
                handleCurrencyChange={handleCurrencyChange}
                name={buttonClick ? "currencies-out" : "currencies-in"}
                defaultVal="USD"
              />
            </div>

            {/**swtich currencies button **/}
            <div className="col-2 d-flex justify-content-center align-items-center switch-btn-col my-2 my-md-0">
              <button
                onClick={handleButton}
                className="btn btn-lg btn-dark rounded-circle switch-button"
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="d-flex switch-icon ms-1 ms-xl-2"
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="d-flex switch-icon ms-xl-1"
                ></FontAwesomeIcon>
              </button>
            </div>

            {/** output of conversion **/}
            <div
              id="output-block"
              className="col-12 col-md-5 d-flex flex-column align-items-center "
            >
              <p className="fw-light">to</p>
              <p className="output-number my-md-3">
                {buttonClick ? input : output}
              </p>
              <CurrencySelector
                handleCurrencyChange={handleCurrencyChange}
                name={buttonClick ? "currencies-in" : "currencies-out"}
                defaultVal="SEK"
              />
            </div>
          </div>
          <p
            id="diff-currencies"
            className="fst-italic visually-hidden ms-sm-4 ms-md-2 ms-xl-5"
          >
            Please choose two <span className="fw-bold">different</span>{" "}
            currencies{" "}
          </p>
        </div>

        <div className="mt-4 px-xl-4">
          <Chart
            currencyInput={currencyInput}
            currencyOutput={currencyOutput}
            buttonClick={buttonClick}
            redraw="true"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPage;
