import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import LoadData from '../../utils/LoadData'
import '../../css/ConversionOutput.css'
import currencyFormatter from '../../utils/currencyFormatter'
import FilterNum from '../../utils/FilterNum'
import FontAwesomeIcon from '../../utils/getFontIcon'

function ConversionOutput(props) {
  const { baseCurrency, toCurrency, rate, currencyInput } = props

  const [baseCurrencyLabel, setBaseCurrencyLabel] = useState(undefined)
  const [toCurrencyLabel, setToCurrencyLabel] = useState(undefined)
  const [fromCurrency, setFromCurrency] = useState(undefined)
  const [currencyOutput, setCurrencyOutput] = useState(undefined)
  const [toFormatter, setToFormatter] = useState(undefined)
  const [fromFormatter, setFromFormatter] = useState(undefined)

  const api = 'https://altexchangerateapi.herokuapp.com/currencies'

  const setOutput = (num) => {
    let output = FilterNum(num, num) * rate
    toFormatter || setFormatter(toCurrency)
    setCurrencyOutput(toFormatter.format(output))
  }

  const initLabels = (result) => {
    setBaseCurrencyLabel(result[baseCurrency])
    setToCurrencyLabel(result[toCurrency])
  }

  const setFormatter = (format) => {
    setToFormatter(toCurrency && currencyFormatter(format))
  }

  useEffect(() => {
    if (currencyInput && toCurrency && baseCurrency) {
      setToFormatter(currencyFormatter(toCurrency))
      setFromFormatter(currencyFormatter(baseCurrency))
      LoadData(api, initLabels)
    }
  }, [baseCurrency, toCurrency, currencyInput])

  useEffect(() => {
    if (toFormatter) setOutput(currencyInput)

    if (fromFormatter) setFromCurrency(fromFormatter.format(currencyInput))
  }, [currencyInput, rate, toFormatter])

  // FIXED: needs fixed positioning
  // FIXED: move to corner more
  return (
    <>
      <div className='pl-5 converted-output text-left inline-flex'>
        <br />
        <span className='font-weight-bold'>From:</span>
        <span>
          {' '}
          {baseCurrency} - {baseCurrencyLabel}
        </span>
        <br />
        <span className='font-weight-bold'>Input:</span>{' '}
        <span>{fromCurrency}</span>
        <br />
        <span className='font-weight-bold'>Rate:</span> <span>{rate}</span>
        <br />
        <span className='font-weight-bold'>To:</span>
        <span>
          {' '}
          {toCurrency} - {toCurrencyLabel}
        </span>
        <br />
        <span className='font-weight-bold'>Conversion:</span>{' '}
        <span>{currencyOutput}</span>
      </div>
    </>
  )
}

export default ConversionOutput
