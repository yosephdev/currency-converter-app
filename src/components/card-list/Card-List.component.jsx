import React from 'react';
import './card-list.styles.css';
import Card from '../card/Card.component';

const CardList = (props) => (
    <div className="card-list">
        {props.currencies.map(currency => (
            <Card key={currency.id} currency={currency}/>
        ))}
    </div>
)

export default CardList;