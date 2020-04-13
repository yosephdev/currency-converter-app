import React, { useEffect, useState, useRef } from 'react';
import './HistoricRatesPage.css';
import styled from 'styled-components';
import CurrencyConverter from '../HomePage/CurrencyConverter.js';
import Chart from 'chart.js';

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


function HistoricRatesPage() {
    const apiURL = 'https://api.exchangeratesapi.io/latest';

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [rates, setRates] = useState([]);


    const chartRef = useRef(null);
    let chart;

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
            });
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const buildChart = (labels, data, label) => {
        if (typeof chart !== "undefined") {
            chart.destroy();
        }
        chart = new Chart(chartRef.current.getContext("2d"), {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: label,
                        data,
                        fill: false,
                        tension: 0,
                    }
                ]
            },
            options: {
                responsive: true,
            }
        })
    }

    useEffect(() => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }

                const chartLabels = Object.keys(data.rates);
                const chartData = Object.values(data.rates).map(rate => rate[toCurrency]);
                const chartLabel = `${fromCurrency}/${toCurrency}`;
                buildChart(chartLabels, chartData, chartLabel);
            })
            .catch(error => console.error(error.message));
    }, [buildChart, fromCurrency, toCurrency])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${apiURL}?base=${fromCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))
        }
    }, [fromCurrency, toCurrency])


    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    console.log('render');

    return (
        <>
            <Main>
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
            </Main>
            <canvas ref={chartRef} />
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


export default HistoricRatesPage;