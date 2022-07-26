const express = require("express");
const {
  addPropertyToRent,
  getAllPropertiesToRent,
  getPropertyToRent,
  updatePropertyToRent,
  deletePropertyToRent,
} = require("../controllers/propertyToRentController");

const router = express.Router();

router.post("/property_to_rent", addPropertyToRent);
router.get("/properties_to_rent", getAllPropertiesToRent);
router.get("/properties_to_rent/:id", getPropertyToRent);
router.put("/properties_to_rent/:id", updatePropertyToRent);
router.delete("/properties_to_rent/:id", deletePropertyToRent);

module.exports = {
  routes: router,
};
