"use strict";
const moment = require("moment");
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

const getBookingsByUserID = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const bookings = firestore.collection("bookings");
    const bookingsSnapshot = await bookings.where("userId", "==", userId).get();
    if (bookingsSnapshot.empty) {
      res.status(404).send("Booking with this user ID was not found!");
    } else {
      const pastBookings = [];
      const futureBookings = [];
      bookingsSnapshot.forEach((doc) => {
        const isFuture = moment(doc.data().startDate).isAfter(moment());
        console.log(isFuture);
        if (isFuture) {
          futureBookings.push({ ...doc.data(), id: doc.id, isFuture: true });
        } else {
          pastBookings.push({ ...doc.data(), id: doc.id, isFuture: false });
        }
      });
      console.log("past bookings", pastBookings);
      pastBookings.sort((a, b) =>
        moment(a.startDate).isAfter(moment(b.startDate))
          ? -1
          : moment(a.startDate).isBefore(moment(b.startDate))
          ? 1
          : 0
      );
      console.log(pastBookings);
      futureBookings.sort((a, b) =>
        moment(a.startDate).isAfter(moment(b.startDate))
          ? 1
          : moment(a.startDate).isBefore(moment(b.startDate))
          ? -1
          : 0
      );
      console.log(futureBookings);
      res.send([...futureBookings, ...pastBookings]);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  addBooking,
  getAllBookings,
  getBookingsByUserID,
};
