import React, { useState, useEffect } from 'react'
import createCurrencyList from '../../utils/createCurrencyList'
import getFlagIconByCountryCode from '../../utils/getFlagIconByCountryCode'
import FilterNum from '../../utils/FilterNum'
import currencyFormatter from '../../utils/currencyFormatter'

export default function CurrencyTableRow(props) {
  const { currencyList, currencyInput } = props

  const [currenciesList, setCurrenciesList] = useState([])

  let toFormatter = null

  useEffect(() => {
    if (currencyList.rates) {
      setCurrenciesList(createCurrencyList(currencyList.rates))
    }
  }, [])

  return (
    <>
      {currenciesList.map((currency, i) => {
        toFormatter = currencyFormatter(currency)
        return (
          <div className='currency-data row'>
            <div className='col-4'>
              {getFlagIconByCountryCode(currency)} {currency}
            </div>
            <div className='col-4'>{currencyList.rates[currency]}</div>
            <div className='col-4'>
              {toFormatter.format(
                FilterNum(currencyInput) * currencyList.rates[currency]
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
