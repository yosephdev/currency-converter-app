import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { convertCurrency, getHistoricalRates, getFlagImageUrl } from "./utils";
import { Box, Typography, CircularProgress } from "@mui/material";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ currencyInput, currencyOutput, buttonClick }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);

  const getHistoricalRatesData = useCallback(
    async (baseCurrency, quoteCurrency) => {
      if (baseCurrency === quoteCurrency) {
        setError("Please select different currencies for comparison");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const endDate = new Date().toISOString().split("T")[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        const data = await getHistoricalRates(
          startDate,
          endDate,
          baseCurrency,
          quoteCurrency
        );

        setChartLabels(Object.keys(data.rates));
        setChartData(
          Object.values(data.rates).map((rate) => rate[quoteCurrency])
        );
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getHistoricalRatesData(
      buttonClick ? currencyOutput : currencyInput,
      buttonClick ? currencyInput : currencyOutput
    );
  }, [currencyInput, currencyOutput, buttonClick, getHistoricalRatesData]);

  useEffect(() => {
    const fetchCurrentRate = async () => {
      try {
        const rate = await convertCurrency(1, currencyInput, currencyOutput);
        setCurrentRate(rate);
      } catch (error) {
        console.error("Error fetching current rate:", error);
      }
    };

    fetchCurrentRate();
  }, [currencyInput, currencyOutput]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: buttonClick ? currencyInput : currencyOutput,
        data: chartData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: buttonClick ? currencyInput : currencyOutput,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `${buttonClick ? currencyOutput : currencyInput} to ${
          buttonClick ? currencyInput : currencyOutput
        } Exchange Rate (Last 30 Days)`,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `1 ${
              buttonClick ? currencyOutput : currencyInput
            } = ${value.toFixed(4)} ${
              buttonClick ? currencyInput : currencyOutput
            }`;
          },
        },
      },
    },
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className="chart" p={2}>
      {currentRate && (
        <Typography variant="h6" gutterBottom>
          Current Rate: 1
          <img
            src={getFlagImageUrl(currencyInput)}
            alt={currencyInput}
            style={{ marginLeft: "5px", marginRight: "5px" }}
          />
          {currencyInput} = {currentRate.toFixed(4)}
          <img
            src={getFlagImageUrl(currencyOutput)}
            alt={currencyOutput}
            style={{ marginLeft: "5px", marginRight: "5px" }}
          />
          {currencyOutput}
        </Typography>
      )}
      <Line data={data} options={options} />
    </Box>
  );
};

export default Chart;
