const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const contryRoutes = require("./routes/contryRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", authRoutes);

app.use("/country", contryRoutes);

app.listen(8000);
