import React, { useState } from "react";
import axios from "axios";

const CompanyPerformance = () => {
  const [companyName, setCompanyName] = useState("");
  const [performanceData, setPerformanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:3003/performance/company",
        {
          params: { companyName },
        }
      );

      setPerformanceData(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Company Performance</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>
        <button type="submit">Get Performance Data</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <h2>Performance Data:</h2>
      {performanceData.map((data, index) => (
        <div key={index}>
          <p>Date: {data.date}</p>
          <p>Rate: {data.rate}</p>
        </div>
      ))}
    </div>
  );
};

export default CompanyPerformance;
