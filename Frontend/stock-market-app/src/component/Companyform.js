import React, { useState, useEffect } from "react";
import "./companyform.css";

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState("");
  const [rate, setRate] = useState("");
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3003/companies");
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        const errorData = await response.json();
        console.error(errorData);
        // Handle the error appropriately (display error message, etc.)
      }
    } catch (error) {
      console.error(error);
      // Handle the error appropriately (display error message, etc.)
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any of the form fields are empty
    if (!companyName || !date || !rate) {
      alert("Please enter all the fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3003/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyName, date, rate }),
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies([...companies, data]);
        console.log(data);

        // Clear the form inputs after successful submission
        setCompanyName("");
        setDate("");
        setRate("");
      } else {
        const errorData = await response.json();
        console.error(errorData);
        // Handle the error appropriately (display error message, etc.)
      }
    } catch (error) {
      console.error(error);
      // Handle the error appropriately (display error message, etc.)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add Company</h2>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            placeholder="Enter date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate:</label>
          <input
            type="text"
            id="rate"
            placeholder="Enter rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div className="company-list">
        {companies.length > 0 && <h2>Companies:</h2>}
        {companies.map((company, index) => (
          <div key={`${company.companyName}-${index}`} className="company-item">
            <h3>{company.companyName}</h3>
            <ul>
              {company.performance.map((data, idx) => (
                <li key={`${company.companyName}-${data.date}-${idx}`}>
                  Date: {data.date}, Rate: {data.rate}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyForm;
