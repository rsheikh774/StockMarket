const express = require("express");
const router = express.Router();
const Company = require("../server/model/companySchema");
const cors = require("cors");

router.use(cors());
// Add a new company or update existing company's performance data
router.post("/companies", async (req, res) => {
  const { companyName, date, rate } = req.body;

  try {
    if (!companyName || !date || !rate) {
      return res.status(400).json({ error: "Please provide all the fields" });
    }

    let existingCompany = await Company.findOne({ companyName });

    if (existingCompany) {
      // Check if the date already exists for the company
      const existingPerformance = existingCompany.performance.find(
        (performance) => performance.date === date
      );

      if (existingPerformance) {
        // If the performance data already exists for the given date, update the rate
        existingPerformance.rate = rate;
      } else {
        // If the performance data doesn't exist for the given date, add a new entry
        existingCompany.performance.push({ date, rate });
      }

      await existingCompany.save();
      res.json(existingCompany);
    } else {
      // If the company doesn't exist, create a new company with the performance data
      const newCompany = new Company({
        companyName,
        performance: [
          {
            date,
            rate,
          },
        ],
      });
      let savedCompany = await newCompany.save();
      res.json(savedCompany);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get all performance rates for a specific date across all companies
router.get("/performance/date", async (req, res) => {
  const targetDate = new Date(req.query.date);

  try {
    const companies = await Company.find({ "performance.date": targetDate });

    const rates = companies.map((company) => {
      const performance = company.performance.find(
        (data) => data.date.getTime() === targetDate.getTime()
      );
      return {
        companyName: company.companyName,
        rate: performance.rate,
      };
    });

    res.json(rates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server errorrr" });
  }
});

// Get performance data for a particular company
router.get("/performance/company", async (req, res) => {
  const companyName = req.query.companyName;
  try {
    const company = await Company.findOne({ companyName });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company.performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
