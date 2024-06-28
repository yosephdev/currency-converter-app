import React from "react";
import PropTypes from "prop-types";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { getFlagImageUrl } from "./utils";

const StyledSelect = styled(Select)({
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
  },
});

const FlagImg = styled("img")({
  width: "20px",
  marginRight: "8px",
  verticalAlign: "middle",
});

const currencies = [
  { code: "AUD", name: "Australian Dollar" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Renminbi Yuan" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "DKK", name: "Danish Krone" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli New Sheqel" },
  { code: "INR", name: "Indian Rupee" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "KRW", name: "South Korean Won" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Złoty" },
  { code: "RON", name: "Romanian Leu" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "THB", name: "Thai Baht" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "USD", name: "United States Dollar" },
  { code: "ZAR", name: "South African Rand" },
];

const CurrencySelector = ({ name, value, onChange, label }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <StyledSelect
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        renderValue={(selected) => {
          const currency = currencies.find((c) => c.code === selected);
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FlagImg
                src={getFlagImageUrl(currency.code)}
                alt={`${currency.name} flag`}
              />
              {currency.code}
            </div>
          );
        }}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency.code} value={currency.code}>
            <ListItemIcon>
              <FlagImg
                src={getFlagImageUrl(currency.code)}
                alt={`${currency.name} flag`}
              />
            </ListItemIcon>
            <ListItemText primary={`${currency.code} - ${currency.name}`} />
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

CurrencySelector.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CurrencySelector;
