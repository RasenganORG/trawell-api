const express = require("express");

const {
  addBooking,
  getAllBookings,
  getBookingsByUserID,
} = require("../controllers/bookingsController");

const router = express.Router();

router.post("/booking", addBooking);
router.get("/bookings", getAllBookings);
router.get("/bookings/:userId", getBookingsByUserID);

module.exports = { routes: router };
