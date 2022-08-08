const express = require("express");
const {
  addPropertyToRent,
  getAllPropertiesToRent,
  getPropertyToRent,
  getPropertyByCountry,
  updatePropertyToRent,
  deletePropertyToRent,
} = require("../controllers/propertyToRentController");

const router = express.Router();

router.post("/propertyToRent", addPropertyToRent);
router.get("/propertiesToRent", getAllPropertiesToRent);
router.get("/propertiesToRent/:country", getPropertyByCountry);
router.get("/propertiesToRent/:id", getPropertyToRent);
router.put("/propertiesToRent/:id", updatePropertyToRent);
router.delete("/propertiesToRent/:id", deletePropertyToRent);

module.exports = {
  routes: router,
};
