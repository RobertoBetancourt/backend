const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");

const countryController = require("../controller/countryController");
const { get } = require("./authRoutes");

router.get("/", countryController.getCountries);

router.get("/all", countryController.getAllCountries);

router.post("/:id", isAuth, countryController.postCountry);

module.exports = router;
