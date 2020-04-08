import React from 'react';

function CurrencyConverter(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props;
    return (
        <div className="currency-converter">
            <select
                value={selectedCurrency}
                onChange={onChangeCurrency}
                className="custom-select mr-sm-2"
            >
                {currencyOptions.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <input
                type="tel"
                value={amount}
                onChange={onChangeAmount}
                placeholder="Currency"
            />
        </div>
    );
}

export default CurrencyConverter