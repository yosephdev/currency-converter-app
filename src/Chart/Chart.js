import React from "react";
import { Line } from "react-chartjs-2"; 

const ChartComponent = ({ data }) => {
  // Prepare data and options for Chart.js here

  return (
    <div>
      <Line data={preparedData} options={options} />
    </div>
  );
};
