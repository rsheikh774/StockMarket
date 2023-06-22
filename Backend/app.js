const express = require("express");
const app = express();
const mongoose = require("mongoose");
const company = require("./route/company");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function connect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Stockmarket");
}
connect();
app.use(company);

app.listen(3003, () => {
  console.log("port-:3003");
});
