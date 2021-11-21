import React from 'react'

export default function CurrencyTableHeader(props) {
  return (
    <div className='heading row'>
      <div className='col-4'>Currency</div>
      <div className='col-4'>Rate</div>
      <div className='col-4'>Conversion</div>
    </div>
  )
}
