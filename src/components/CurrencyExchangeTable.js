import React from "react";
import PropTypes from "prop-types";
import { currencyInfo } from "./utils";


const CurrencyExchangeTable = ({ exchangeRates, base, amount }) => {
  const baseCurrency = currencyInfo.find((currency) => currency.code === base) || {};
  const { flag: baseFlag, currencyName: baseName } = baseCurrency;

  const tableTop = (
    <tr>
      <th className="heading-flag">{baseFlag}</th>
      <th className="heading-base">
        {base} - {baseName}
      </th>
      <th className="heading-amount">{amount}</th>
    </tr>
  );

  const tableData = exchangeRates.map((item) => {
    const correspondingInfo =
      currencyInfo.find((infoItem) => infoItem.code === item.code) || {};
    return (
      <tr key={item.code}>
        <td>
          <span
            role="img"
            aria-label={`${correspondingInfo.currencyName} flag`}
          >
            {correspondingInfo.flag}
          </span>
        </td>
        <td>
          {item.code} - {correspondingInfo.currencyName}
        </td>
        <td className="text-xl-center">{(item.value * amount).toFixed(2)}</td>
      </tr>
    );
  });

  return (
    <table id="exchange-table" className="table table-hover">
      <thead className="d-xl-none">{tableTop}</thead>
      <tbody>{tableData}</tbody>
    </table>
  );
};

CurrencyExchangeTable.propTypes = {
  exchangeRates: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  base: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default CurrencyExchangeTable;
