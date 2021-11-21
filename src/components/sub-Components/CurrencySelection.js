import React from 'react'
import getFlagIconByCountryCode from '../../utils/getFlagIconByCountryCode'
import '../../css/CurrencySelection.css'

export default function CurrencySelection(props) {
  const { currencyListKeys, currencySelector } = props

  let dataSet = <p>empty array</p>

  if (currencyListKeys) {
    dataSet = currencyListKeys.map((el, i) => {
      return (
        <li onClick={currencySelector} class='currency-link text-center'>
          <span>{getFlagIconByCountryCode(el)}</span> {el}
        </li>
      )
    })
  }

  return <React.Fragment>{dataSet}</React.Fragment>
}
