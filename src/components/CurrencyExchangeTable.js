import React from "react";
import PropTypes from "prop-types";
import { currencyInfo, formatCurrency, getFlagImageUrl } from "./utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const FlagImg = styled("img")({
  width: "20px",
  marginRight: "8px",
  verticalAlign: "middle",
});

const CurrencyExchangeTable = ({ exchangeRates, base, amount }) => {
  const baseCurrency =
    currencyInfo.find((currency) => currency.code === base) || {};
  const { currencyName: baseName } = baseCurrency;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="currency exchange table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <FlagImg src={getFlagImageUrl(base)} alt={`${baseName} flag`} />
              {base} - {baseName}
            </StyledTableCell>
            <StyledTableCell align="right">{amount}</StyledTableCell>
            <StyledTableCell align="right">Converted Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchangeRates.map((item) => {
            const correspondingInfo =
              currencyInfo.find((infoItem) => infoItem.code === item.code) ||
              {};
            const convertedAmount = item.value * amount;
            return (
              <TableRow key={item.code} hover>
                <TableCell>
                  <FlagImg
                    src={getFlagImageUrl(item.code)}
                    alt={`${correspondingInfo.currencyName} flag`}
                  />
                  <Typography component="span" variant="body2">
                    {item.code} - {correspondingInfo.currencyName}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(1, item.code)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(convertedAmount, item.code)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
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
