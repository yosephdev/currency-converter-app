import React from 'react'
import '../../css/CurrencyInput.css'

export default function CurrencyInput(props) {
  const { handler, symbol, value } = props

  return (
    <React.Fragment>      
      <div className='symbol'>{symbol}</div>
      <input
        type='text'
        placeholder='0.00'
        onChange={handler}
        class='span2'
        size='16'
        value={value}
      />
    </React.Fragment>
  )
}
