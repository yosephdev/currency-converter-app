import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import './Converter.css'

const CurrencyTable = (props) => {
  const { base, rates } = props
  if (!rates) {
    return null
  }
  return (
    <table className='table table-sm bg-light mt-4'>
      <thead>
        <tr>
          <th scope='col'></th>
          <th scope='col' className='text-right pr-4 py-2'>
            1.00 {base}
          </th>
        </tr>
      </thead>
      <tbody>
        {rates.map((currency) => (
          <tr key={currency.acronym}>
            <td className='pl-4 py-2'>
              {currency} <small>({currency.acronym})</small>
            </td>
            <td className='text-right pr-4 py-2'>{currency.rate.toFixed(6)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Converter = () => {
  const [currencies, setCurrencies] = useState([])
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromAmount, setFromAmount] = useState(1)
  const [toAmount, setToAmount] = useState('')
  const [rates, setRates] = useState([])

  const BASE_URL = 'https://api.frankfurter.app/'
  const CONVERT_API = `${BASE_URL}latest?amount=${fromAmount}&from=${fromCurrency}&to=${toCurrency}`
  const CURRENCIES_API = `${BASE_URL}currencies`

  const fetchData = async (api) => {
    const currencyResponse = await fetch(api)
    return await currencyResponse.json()
  }

  useEffect(() => {
    fetchData(CURRENCIES_API).then((data) => {
      setCurrencies(Object.entries(data))
    })
  }, [CURRENCIES_API])

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      if (fromAmount < 0 || fromAmount === '') {
        setToAmount('')
      } else {
        setToAmount(fromAmount)
      }
    } else if (fromAmount < 0 || fromAmount === '') {
      setToAmount('')
    } else if (fromAmount === 0) {
      setToAmount(0)
    } else {
      fetchData(CONVERT_API).then((data) => setToAmount(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency, fromAmount, CONVERT_API])

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value)
  }

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value)
  }

  const handleFromAmountChange = (e) => {
    setFromAmount(e.target.value)
  }

  return (
    <>
      <Main>
        <div className='Converter'>
          <h2>Always get the real exchange rate</h2>

          <div className='Converter-body'>
            <div>
              <label htmlFor='from'>From</label>
              <br />
              <select
                name='from'
                id='from'
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              >
                {currencies.map((currency) => (
                  <option value={currency[0]} key={currency[0]}>
                    {currency[1]}
                  </option>
                ))}
              </select>
              <br />

              <input
                type='number'
                defaultValue={fromAmount}
                onChange={handleFromAmountChange}
              />
            </div>

            <div>
              <label htmlFor='to'>To</label>
              <br />
              <select
                name='to'
                id='to'
                value={toCurrency}
                onChange={handleToCurrencyChange}
              >
                {currencies.map((currency) => (
                  <option value={currency[0]} key={currency[0]}>
                    {currency[1]}
                  </option>
                ))}
              </select>

              <p className='to-amount'>
                {toAmount !== '' ? Math.round(toAmount * 100) / 100 : ''}
              </p>
            </div>
          </div>
        </div>
        
      </Main>
      <CurrencyTable base={fromCurrency} rates={rates} />
    </>
  )
}

const Main = styled.main`
  max-width: 1280px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Converter
