import React, { useState, useEffect, useCallback } from "react";
import { fetchWithCaching, getFlagImageUrl } from "./utils";
import CurrencySelector from "./CurrencySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import Chart from "./Chart";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const FlagImg = styled("img")({
  width: "20px",
  marginRight: "8px",
});

const CurrencyConverterPage = () => {
  const [input, setInput] = useState("1");
  const [output, setOutput] = useState("");
  const [currencyInput, setCurrencyInput] = useState("USD");
  const [currencyOutput, setCurrencyOutput] = useState("EUR");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchConversion = useCallback(() => {
    if (currencyInput === currencyOutput) {
      setOutput(input);
      setError("Please choose two different currencies");
      return;
    }

    setError(null);
    const url = `https://api.frankfurter.app/latest?amount=${input}&from=${currencyInput}&to=${currencyOutput}`;

    fetchWithCaching(url)
      .then((data) => {
        setOutput(data.rates[currencyOutput].toFixed(2));
        setLastUpdated(new Date().toLocaleString());
      })
      .catch((error) => {
        console.error("Error fetching conversion:", error);
        setError("Failed to fetch conversion. Please try again.");
      });
  }, [input, currencyInput, currencyOutput]);

  useEffect(() => {
    fetchConversion();
  }, [fetchConversion]);

  const handleInput = (event) => {
    const newInput = event.target.value;
    setInput(newInput);
  };

  const handleCurrencyChange = (event) => {
    const { name, value } = event.target;
    if (name === "currencies-in") setCurrencyInput(value);
    if (name === "currencies-out") setCurrencyOutput(value);
  };

  const handleSwap = () => {
    setCurrencyInput(currencyOutput);
    setCurrencyOutput(currencyInput);
    setInput(output);
    setOutput(input);
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Currency Converter
      </Typography>

      <Box my={4}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="From"
              type="number"
              value={input}
              onChange={handleInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlagImg
                      src={getFlagImageUrl(currencyInput)}
                      alt={currencyInput}
                    />
                    <CurrencySelector
                      name="currencies-in"
                      value={currencyInput}
                      onChange={handleCurrencyChange}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSwap}
                startIcon={<FontAwesomeIcon icon={faExchangeAlt} />}
              >
                Swap
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="To"
              type="number"
              value={output}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <FlagImg
                      src={getFlagImageUrl(currencyOutput)}
                      alt={currencyOutput}
                    />
                    <CurrencySelector
                      name="currencies-out"
                      value={currencyOutput}
                      onChange={handleCurrencyChange}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {lastUpdated && (
        <Typography variant="caption" display="block" align="right">
          Last updated: {lastUpdated}
        </Typography>
      )}

      <Box mt={4}>
        <Chart
          currencyInput={currencyInput}
          currencyOutput={currencyOutput}
          redraw={true}
        />
      </Box>
    </StyledContainer>
  );
};

export default CurrencyConverterPage;
