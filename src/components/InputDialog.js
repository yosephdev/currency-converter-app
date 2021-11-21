import React from 'react'
import '../css/InputDialog.css'
import ConversionOutput from './sub-Components/ConversionOutput'
import InputDropDown from './sub-Components/InputDropDown'
import InputHeader from './sub-Components/InputHeader'
import CurrencyInput from './sub-Components/CurrencyInput'
import getFlagIconByCountryCode from '../utils/getFlagIconByCountryCode'

function InputDialog(props) {
  const {
    baseCurrency,
    currencyInput,
    currencySelector,
    filteredBaseCurrency,
    filteredToCurrency,
    filterTyping,
    rate,
    selectBaseCurrency,
    selectToCurrency,
    setInput,
    symbol,
    toCurrency,
    validBaseCurrency,
    validToCurrency,
  } = props

  // deal with inputs changing
  const handler = (e) => {
    if (e.target.id.indexOf('appendedInput') > 0) {
      filterTyping(e.target)
    } else {
      setInput(e.target.value)
    }
  }

  const baseCurrencySelectorValue =
    validBaseCurrency === true
      ? `${getFlagIconByCountryCode(
          baseCurrency,
          validBaseCurrency
        )} ${selectBaseCurrency}`
      : selectBaseCurrency
  const toCurrencySelectorValue =
    validToCurrency === true
      ? `${getFlagIconByCountryCode(
          toCurrency,
          validToCurrency
        )} ${selectToCurrency}`
      : selectToCurrency

  return (
    <div className='converter'>
      <div className='pt-2 container-fluid'>
        <div className='row'>
          <div className='col-12 col-xl-4'>
            <div className='row'>
              <div className='col-6 col-xl-12'>
                <InputHeader padBottom='0' label='Input' />
                <CurrencyInput
                  handler={handler}
                  symbol={symbol}
                  value={currencyInput}
                />
              </div>
             {/*  <hr /> */}

              <div className='col-6 col-xl-12'>
                <ConversionOutput
                  rate={rate}
                  baseCurrency={baseCurrency}
                  toCurrency={toCurrency}
                  currencyInput={currencyInput}
                />
              </div>
            </div>
          </div>

          <div className='col-12 col-xl-4'>
            <InputHeader padBottom='5' label='From' />
            <InputDropDown
              handler={handler}
              currencyListKeys={filteredBaseCurrency}
              id='baseCurrency'
              value={baseCurrencySelectorValue}
              currencySelector={currencySelector}
            />
          </div>
          <div className='col-12 col-xl-4'>
            <InputHeader padBottom='5' label='To' />
            <InputDropDown
              handler={handler}
              currencyListKeys={filteredToCurrency}
              id='transferCurrency'
              value={toCurrencySelectorValue}
              currencySelector={currencySelector}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputDialog
