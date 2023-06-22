const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
  companyName: String,
  performance: [
    {
      date: { type: Date, require: true },
      rate: { type: Number, require: true },
    },
  ],
});
const Company = mongoose.model("Company", companySchema);
module.exports = Company;

// let c = new comany ({
//     companyName,
//     [{date, rate}]
// })
