const express = require("express");
const {
  addPropertyToRent,
  getAllPropertiesToRent,
  getPropertyToRent,
  getPropertyByCountryCity,
  updatePropertyToRent,
  deletePropertyToRent,
  getPropertyAvailable,
  getPropertyByCountry,
} = require("../controllers/propertyToRentController");

const router = express.Router();

router.post("/propertyToRent", addPropertyToRent);
router.get("/propertiesToRent", getAllPropertiesToRent);
router.get("/properties", getPropertyByCountryCity);
router.get("/country/:country", getPropertyByCountry);
router.get("/available", getPropertyAvailable);
router.get("/propertiesToRent/:id", getPropertyToRent);
router.put("/propertiesToRent/:id", updatePropertyToRent);
router.delete("/propertiesToRent/:id", deletePropertyToRent);

module.exports = {
  routes: router,
};
