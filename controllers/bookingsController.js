"use strict";

const firebase = require("../db");
const Bookings = require("../models/bookings");
const firestore = firebase.firestore();

const addBooking = async (req, res, next) => {
  try {
    const data = req.body;
    const newBooking = {
      ...data,
      id: firestore.collection("bookings").doc().id,
    };
    await firestore.collection("bookings").doc(newBooking.id).set(newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await firestore.collection("bookings");
    const data = await bookings.get();
    const bookingsArray = [];
    if (data.empty) {
      res.status(404).send("No booking found");
    } else {
      data.forEach((doc) => {
        const booking = new Bookings(
          doc.id,
          doc.data().userId,
          doc.data().roomId,
          doc.data().startDate,
          doc.data().endDate,
          doc.data().numberOfTrawellers,
          doc.data().price,
          doc.data().country,
          doc.data().city,
          doc.data().photo
        );
        bookingsArray.push(booking);
      });
      res.send(bookingsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addBooking,
  getAllBookings,
};
