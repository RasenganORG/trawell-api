"use strict";

const firebase = require("../db");
const PropertyToRent = require("../models/propertyToRent");
const firestore = firebase.firestore();

const addPropertyToRent = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("propertiesToRent").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPropertiesToRent = async (req, res, next) => {
  try {
    const propertiesToRent = await firestore.collection("propertiesToRent");
    const data = await propertiesToRent.get();
    const propertiesToRentArray = [];
    if (data.empty) {
      res.status(404).send("No property record found");
    } else {
      data.forEach((doc) => {
        const propertieToRentArray = new propertieToRentArray(
          doc.id,
          doc.data().propertyStyle,
          doc.data().propertyType,
          doc.data().roomType,
          doc.data().numberOfGuests,
          doc.data().numberOfBedrooms,
          doc.data().numberOfBeds,
          doc.data().numberOfBathrooms,
          doc.data().adress,
          doc.data().amenities,
          doc.data().photos
        );
        propertiesToRentArray.push(propertiesToRent);
      });
      res.send(propertiesToRentArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPropertyToRent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const propertyToRent = await firestore
      .collection("propertiesToRent")
      .doc(id);
    const data = await propertyToRent.get();
    if (!data.exists) {
      res.status(404).send("Property with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePropertyToRent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const propertyToRent = await firestore
      .collection("propertiesToRent")
      .doc(id);
    await propertyToRent.update(data);
    res.send("Property record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletePropertyToRent = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("propertiesToRent").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addPropertyToRent,
  getAllPropertiesToRent,
  getPropertyToRent,
  updatePropertyToRent,
  deletePropertyToRent,
};
