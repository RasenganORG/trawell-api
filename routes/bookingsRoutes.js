const express = require("express");

const {
  addBooking,
  getAllBookings,
} = require("../controllers/bookingsController");

const router = express.Router();

router.post("/booking", addBooking);
router.get("/bookings", getAllBookings);

module.exports = { routes: router };
