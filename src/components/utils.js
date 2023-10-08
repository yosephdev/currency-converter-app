// functions for fetch

export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(
    `Request failed with status: ${response.status} ${response.statusText}`
  );
};

export const json = (response) => response.json();

// list of currencies with flag, code, and name for each one

export const currencyInfo = [
  {
    flag: "🇦🇺",
    code: "AUD",
    currencyName: "Australian Dollar",
  },
  {
    flag: "🇧🇬",
    code: "BGN",
    currencyName: "Bulgarian Lev",
  },
  {
    flag: "🇧🇷",
    code: "BRL",
    currencyName: "Brazilian Real",
  },
  {
    flag: "🇨🇦",
    code: "CAD",
    currencyName: "Canadian Dollar",
  },
  {
    flag: "🇨🇭",
    code: "CHF",
    currencyName: "Swiss Franc",
  },
  {
    flag: "🇨🇳",
    code: "CNY",
    currencyName: "Chinese Renminbi Yuan",
  },
  {
    flag: "🇨🇿",
    code: "CZK",
    currencyName: "Czech Koruna",
  },
  {
    flag: "🇩🇰 ",
    code: "DKK",
    currencyName: "Danish Krone",
  },
  {
    flag: "🇪🇺",
    code: "EUR",
    currencyName: "Euro",
  },
  {
    flag: "🇬🇧 ",
    code: "GBP",
    currencyName: "British Pound",
  },
  {
    flag: "🇭🇰",
    code: "HKD",
    currencyName: "Hong Kong Dollar",
  },
  {
    flag: "🇭🇷",
    code: "HRK",
    currencyName: "Croatian Kuna",
  },
  {
    flag: "🇭🇺",
    code: "HUF",
    currencyName: "Hungarian Forint",
  },
  {
    flag: "🇮🇩",
    code: "IDR",
    currencyName: "Indonesian Rupiah",
  },
  {
    flag: "🇮🇱",
    code: "ILS",
    currencyName: "Israeli New Sheqel",
  },
  {
    flag: "🇮🇳",
    code: "INR",
    currencyName: "Indian Rupee",
  },
  {
    flag: "🇮🇸",
    code: "ISK",
    currencyName: "Icelandic Króna",
  },
  {
    flag: "🇯🇵",
    code: "JPY",
    currencyName: "Japanese Yen",
  },
  {
    flag: "🇰🇷",
    code: "KRW ",
    currencyName: "South Korean Won",
  },
  {
    flag: "🇲🇽",
    code: "MXN",
    currencyName: "Mexican Peso",
  },
  {
    flag: "🇲🇾",
    code: "MYR",
    currencyName: "Malaysian Ringgit",
  },
  {
    flag: "🇳🇴",
    code: "NOK",
    currencyName: "Norwegian Krone",
  },
  {
    flag: "🇳🇿",
    code: "NZD",
    currencyName: "New Zealand Dollar",
  },
  {
    flag: "🇵🇭",
    code: "PHP",
    currencyName: "Philippine Peso",
  },
  {
    flag: "🇵🇱",
    code: "PLN",
    currencyName: "Polish Złoty",
  },
  {
    flag: "🇷🇴",
    code: "RON",
    currencyName: "Romanian Leu",
  },
  {
    flag: "🇷🇺",
    code: "RUB",
    currencyName: "Russian Ruble",
  },
  {
    flag: "🇸🇪",
    code: "SEK",
    currencyName: "Swedish Krona",
  },
  {
    flag: "🇸🇬",
    code: "SGD",
    currencyName: "Singapore Dollar",
  },
  {
    flag: "🇹🇭",
    code: "THB",
    currencyName: "Thai Baht",
  },
  {
    flag: "🇹🇷",
    code: "TRY",
    currencyName: "Turkish Lira",
  },
  {
    flag: "🇺🇸",
    code: "USD",
    currencyName: "United States Dollar",
  },
  {
    flag: "🇿🇦",
    code: "ZAR",
    currencyName: "South African Rand",
  },
];
