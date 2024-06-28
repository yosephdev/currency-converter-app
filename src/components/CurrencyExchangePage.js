import React, { useEffect, useState, useCallback } from "react";
import { fetchWithCaching, getFlagImageUrl } from "./utils";
import CurrencySelector from "./CurrencySelector";
import CurrencyExchangeTable from "./CurrencyExchangeTable.js";
import {
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const FlagImg = styled("img")({
  width: "20px",
  marginRight: "8px",
});

const CurrencyExchangePage = () => {
  const [amount, setAmount] = useState("1");
  const [base, setBase] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(() => {
    setError(null);
    fetchWithCaching(`https://api.frankfurter.app/latest?from=${base}`)
      .then((response) => {
        const newRates = Object.entries(response.rates).map(
          ([code, value]) => ({ code, value })
        );
        setExchangeRates(newRates);
        setLastUpdated(new Date().toLocaleString());
      })
      .catch((error) => {
        console.error("Error fetching rates:", error);
        setError("Failed to fetch exchange rates. Please try again.");
      });
  }, [base]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const handleBase = (event) => {
    setBase(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Currency Exchange Rates
        </Typography>

        <StyledPaper elevation={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Base Currency
              </Typography>
              <Box display="flex" alignItems="center">
                <FlagImg src={getFlagImageUrl(base)} alt={base} />
                <CurrencySelector
                  name="exchangeOptions"
                  value={base}
                  handleCurrencyChange={handleBase}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={handleAmount}
                InputProps={{
                  inputProps: { min: 1 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlagImg src={getFlagImageUrl(base)} alt={base} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </StyledPaper>

        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}

        <CurrencyExchangeTable
          exchangeRates={exchangeRates}
          base={base}
          amount={parseFloat(amount)}
        />

        {lastUpdated && (
          <Typography variant="caption" display="block" align="right">
            Last updated: {lastUpdated}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CurrencyExchangePage;
