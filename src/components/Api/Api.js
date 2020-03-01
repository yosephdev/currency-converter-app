import React from 'react';
import './Api.css';


const Api = () => {
  
  return (
    <div className="api_resource">
      <div className="container">
        <h1>API Resource</h1>
        <div className="api">
          <div className="api_desc">
            <h2>Exchange rates API</h2>
            <p>Exchange rates API is a free service for current and historical foreign exchange rates published by the European Central Bank. This website project retrieved current currency exchange rate data from Exchange rates RESTful API.</p>
            <button><a href='https://exchangeratesapi.io/' target='_blank'>View API</a> </button>
          </div>          
        </div>
      </div>
    </div>
  )
}
export default Api