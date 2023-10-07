import React, { useEffect, useState } from "react";

const ExchangeRate = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch exchange rates here and update state
    // Set loading to false once data is fetched
  }, []); // Empty dependency array means this useEffect runs once on mount

  return (
    <div>
      {/* Render exchange rates or loading indicator based on loading state */}
    </div>
  );
};

