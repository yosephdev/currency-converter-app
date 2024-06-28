// utils.js

// Cache for storing fetched data
const cache = new Map();

// Enhanced fetch helper functions
export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  return response.json().then((err) => {
    throw new Error(err.message || `HTTP error! status: ${response.status}`);
  });
};

export const json = (response) => response.json();

// Fetch wrapper with error handling and caching
export const fetchWithCaching = async (url, options = {}) => {
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    const response = await fetch(url, options);
    await checkStatus(response);
    const data = await json(response);
    cache.set(url, data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Currency information
export const currencyInfo = [
  { code: "AUD", currencyName: "Australian Dollar" },
  { code: "BGN", currencyName: "Bulgarian Lev" },
  { code: "BRL", currencyName: "Brazilian Real" },
  { code: "CAD", currencyName: "Canadian Dollar" },
  { code: "CHF", currencyName: "Swiss Franc" },
  { code: "CNY", currencyName: "Chinese Renminbi Yuan" },
  { code: "CZK", currencyName: "Czech Koruna" },
  { code: "DKK", currencyName: "Danish Krone" },
  { code: "EUR", currencyName: "Euro" },
  { code: "GBP", currencyName: "British Pound" },
  { code: "HKD", currencyName: "Hong Kong Dollar" },
  { code: "HRK", currencyName: "Croatian Kuna" },
  { code: "HUF", currencyName: "Hungarian Forint" },
  { code: "IDR", currencyName: "Indonesian Rupiah" },
  { code: "ILS", currencyName: "Israeli New Sheqel" },
  { code: "INR", currencyName: "Indian Rupee" },
  { code: "ISK", currencyName: "Icelandic Króna" },
  { code: "JPY", currencyName: "Japanese Yen" },
  { code: "KRW", currencyName: "South Korean Won" },
  { code: "MXN", currencyName: "Mexican Peso" },
  { code: "MYR", currencyName: "Malaysian Ringgit" },
  { code: "NOK", currencyName: "Norwegian Krone" },
  { code: "NZD", currencyName: "New Zealand Dollar" },
  { code: "PHP", currencyName: "Philippine Peso" },
  { code: "PLN", currencyName: "Polish Złoty" },
  { code: "RON", currencyName: "Romanian Leu" },
  { code: "RUB", currencyName: "Russian Ruble" },
  { code: "SEK", currencyName: "Swedish Krona" },
  { code: "SGD", currencyName: "Singapore Dollar" },
  { code: "THB", currencyName: "Thai Baht" },
  { code: "TRY", currencyName: "Turkish Lira" },
  { code: "USD", currencyName: "United States Dollar" },
  { code: "ZAR", currencyName: "South African Rand" },
];

// Helper function to get currency info by code
export const getCurrencyInfoByCode = (code) => {
  return currencyInfo.find((currency) => currency.code === code) || null;
};

// Helper function to get flag image URL by currency code
export const getFlagImageUrl = (currencyCode) => {
  return `https://flagcdn.com/w20/${currencyCode
    .slice(0, 2)
    .toLowerCase()}.png`;
};

// Helper function to format currency amount
export const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Helper function to sort currencies
export const sortCurrencies = (currencies, sortBy = "code") => {
  return [...currencies].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
};

// Function to convert currency
export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
  const data = await fetchWithCaching(url);
  return data.rates[toCurrency];
};

// Function to get historical rates
export const getHistoricalRates = async (
  startDate,
  endDate,
  baseCurrency,
  quoteCurrency
) => {
  const url = `https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${quoteCurrency}`;
  return await fetchWithCaching(url);
};
