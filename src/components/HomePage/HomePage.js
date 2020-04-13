import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './HomePage.css';
import CurrencyConverter from './CurrencyConverter';

const currencies = {
    AUD: {
        symbol: '$',
        name: 'Australian dollar',
    },
    BGN: {
        symbol: 'лв',
        name: 'Bulgarian lev',
    },
    BRL: {
        symbol: 'R$',
        name: 'Brazilian real',
    },
    CAD: {
        symbol: '$',
        name: 'Canadian dollar',
    },
    CHF: {
        symbol: 'Fr',
        name: 'Swiss franc',
    },
    CNY: {
        symbol: '¥',
        name: 'Chinese yuan',
    },
    CZK: {
        symbol: 'Kč',
        name: 'Czech koruna',
    },
    DKK: {
        symbol: 'kr',
        name: 'Danish krone',
    },
    EUR: {
        symbol: '€',
        name: 'Euro',
    },
    GBP: {
        symbol: '£',
        name: 'British pound',
    },
    HKD: {
        symbol: '$',
        name: 'Hong Kong dollar',
    },
    HRK: {
        symbol: 'kn',
        name: 'Croatian kuna',
    },
    HUF: {
        symbol: 'Ft',
        name: 'Hungarian forint',
    },
    IDR: {
        symbol: 'Rp',
        name: 'Indonesian rupiah',
    },
    ILS: {
        symbol: '₪',
        name: 'Israeli new shekel',
    },
    INR: {
        symbol: '₹',
        name: 'Indian rupee',
    },
    ISK: {
        symbol: 'kr',
        name: 'Icelandic króna',
    },
    JPY: {
        symbol: '¥',
        name: 'Japanese yen',
    },
    KRW: {
        symbol: '₩',
        name: 'South Korean won',
    },
    MXN: {
        symbol: '$',
        name: 'Mexican peso',
    },
    MYR: {
        symbol: 'RM',
        name: 'Malaysian ringgit',
    },
    NOK: {
        symbol: 'kr',
        name: 'Norwegian krone',
    },
    NZD: {
        symbol: '$',
        name: 'New Zealand dollar',
    },
    PHP: {
        symbol: '₱',
        name: 'Philippine peso',
    },
    PLN: {
        symbol: 'zł',
        name: 'Polish złoty ',
    },
    RON: {
        symbol: 'lei',
        name: 'Romanian leu',
    },
    RUB: {
        symbol: '₽',
        name: 'Russian ruble',
    },
    SEK: {
        symbol: 'kr',
        name: 'Swedish krona',
    },
    SGD: {
        symbol: '$',
        name: 'Singapore dollar',
    },
    THB: {
        symbol: '฿',
        name: 'Thai baht',
    },
    TRY: {
        symbol: '₺',
        name: 'Turkish lira',
    },
    USD: {
        symbol: '$',
        name: 'United States dollar',
    },
    ZAR: {
        symbol: 'R',
        name: 'South African rand',
    },
}

const CurrencyTable = (props) => {
    const { base, rates } = props;
    if (!rates) {
        return null;
    }
    return (
        <table className="table table-sm bg-light mt-4">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col" className="text-right pr-4 py-2">1.00 {base}</th>
                </tr>
            </thead>
            <tbody>
                {rates.map(currency =>
                    <tr key={currency.acronym}>
                        <td className="pl-4 py-2">{currency.name} <small>({currency.acronym})</small></td>
                        <td className="text-right pr-4 py-2">{currency.rate.toFixed(6)}</td>
                    </tr>
                )}
            </tbody>
        </table>)
}

function HomePage() {
    const apiURL = 'https://api.exchangeratesapi.io/latest';

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [rates, setRates] = useState([]);


    let toAmount, fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    useEffect(() => {
        fetch(apiURL)
            .then(res => res.json())
            .then(data => {
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setExchangeRate(data.rates[toCurrency]);
                const rates = Object.keys(data.rates)
                    .filter(acronym => acronym !== fromCurrency)
                    .map(acronym => ({
                        acronym,
                        rate: data.rates[acronym],
                        name: currencies[acronym].name,
                        symbol: currencies[acronym].symbol,
                    }))
                setRates(rates);
            })
    }, [])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${apiURL}?base=${fromCurrency}`)
                .then(res => res.json())
                .then(data => {
                    setExchangeRate(data.rates[toCurrency])

                    const rates = Object.keys(data.rates)
                        .filter(acronym => acronym !== fromCurrency)
                        .map(acronym => ({
                            acronym,
                            rate: data.rates[acronym],
                            name: currencies[acronym].name,
                            symbol: currencies[acronym].symbol,
                        }))
                    setRates(rates);
                });
        }
    }, [fromCurrency, toCurrency]);

    function handleFromAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }
    function handleToAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }

    console.log('render');

    return (
        <>
            <Main>
                <section class="banner">
                    <CurrencyConverter
                        currencyOptions={currencyOptions}
                        selectedCurrency={fromCurrency}
                        onChangeCurrency={e => setFromCurrency(e.target.value)}
                        onChangeAmount={handleFromAmountChange}
                        amount={fromAmount}
                    />
                    <CurrencyConverter
                        currencyOptions={currencyOptions}
                        selectedCurrency={toCurrency}
                        onChangeCurrency={e => setToCurrency(e.target.value)}
                        onChangeAmount={handleToAmountChange}
                        amount={toAmount}
                    />
                    <CurrencyTable base={fromCurrency} rates={rates} />
                </section>
            </Main>
        </>
    );
}

const Main = styled.main`
  max-width: 1280px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default HomePage