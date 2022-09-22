const express = require("express");
const {
  addPropertyToRent,
  getAllPropertiesToRent,
  getPropertyToRent,
  updatePropertyToRent,
  deletePropertyToRent,
  getPropertyByUserId,
  searchProperties,
} = require("../controllers/propertyToRentController");

const router = express.Router();

router.post("/propertyToRent", addPropertyToRent);
router.get("/allRooms/:userId", getAllPropertiesToRent);
router.get("/properties/:userId", getPropertyByUserId);
router.get("/available", searchProperties);
router.get("/propertiesToRent/:id", getPropertyToRent);
router.put("/propertiesToRent/:id", updatePropertyToRent);
router.delete("/propertiesToRent/:id", deletePropertyToRent);

module.exports = {
  routes: router,
};
