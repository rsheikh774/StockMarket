import React, { useState } from "react";
import axios from "axios";

const PerformanceRates = () => {
  const [date, setDate] = useState("");
  const [rates, setRates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:3003/performance/date",
        {
          params: { date },
        }
      );

      setRates(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Performance Rates for Date</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button type="submit">Get Rates</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <h2>Performance Rates:</h2>
      {rates.map((rate, index) => (
        <div key={index}>
          <p>Company Name: {rate.companyName}</p>
          <p>Rate: {rate.rate}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceRates;
