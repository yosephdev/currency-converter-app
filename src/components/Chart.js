import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";

// Register the LinearScale, CategoryScale, PointElement, and LineElement
ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement);

const Chart = ({ currencyInput, currencyOutput, buttonClick }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  const getHistoricalRates = async (baseCurrency, quoteCurrency) => {
    try {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      if (currencyInput !== currencyOutput) {
        const response = await fetch(
          `https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${quoteCurrency}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();
        setChartLabels(Object.keys(data.rates));
        setChartData(
          Object.values(data.rates).map((rate) => rate[quoteCurrency])
        );
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

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
      },
    },
    plugins: {
      title: {
        display: true,
        text: buttonClick
          ? `${currencyOutput}/${currencyInput}`
          : `${currencyInput}/${currencyOutput}`,
        color: "#252525",
      },
    },
  };

  useEffect(() => {
    getHistoricalRates(
      buttonClick ? currencyOutput : currencyInput,
      buttonClick ? currencyInput : currencyOutput
    );
  }, [currencyInput, currencyOutput, buttonClick]);

  return (
    <div className="chart p-sm-2 p-xl-4">
      {error ? <p>Error: {error}</p> : <Line data={data} options={options} />}
    </div>
  );
};

export default Chart;
