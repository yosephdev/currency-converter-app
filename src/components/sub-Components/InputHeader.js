import React from 'react'

export default function InputHeader(props) {
  const { label, padBottom } = props
  return (
    <React.Fragment>
      <div className='row CurrencySelection'>
        <div className={`col-12 pb-xl-${padBottom}`}>
          <h2>{label}</h2>
        </div>
      </div>
    </React.Fragment>
  )
}
