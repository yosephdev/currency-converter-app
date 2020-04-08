import React from 'react';
import './card.styles.css';

const Card = (props) => (
    <div className="card-container">
        <img className="card-img" alt="country flag" src={`https://www.countryflags.io/${props.currency.name.substring(0,2)}/shiny/64.png`}/>
        <h2>{props.currency.name}</h2>
        <p>€1 EUR =  {props.currency.rate.toFixed(2)} {props.currency.name}</p>
    </div>
);

export default Card;