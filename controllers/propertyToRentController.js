"use strict";

const moment = require("moment");
const firebase = require("../db");
const PropertyToRent = require("../models/propertyToRent");
const firestore = firebase.firestore();

const getAllPropertiesToRent = async (req, res, next) => {
  try {
    const propertiesToRent = await firestore.collection("propertiesToRent");
    const data = await propertiesToRent.get();
    const propertiesToRentArray = [];
    if (data.empty) {
      res.status(404).send("No property record found");
    } else {
      data.forEach((doc) => {
        const propertieToRent = new PropertyToRent(
          doc.id,
          doc.data().userId,
          doc.data().rating,
          doc.data().placeType,
          doc.data().propertyType,
          doc.data().roomType,
          doc.data().numberOfGuests,
          doc.data().numberOfBedrooms,
          doc.data().numberOfBeds,
          doc.data().numberOfBathrooms,
          doc.data().bathroomPrivate,
          doc.data().location,
          doc.data().amenities,
          doc.data().photos
        );
        propertiesToRentArray.push(propertieToRent);
      });
      res.send(propertiesToRentArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addPropertyToRent = async (req, res, next) => {
  try {
    const data = req.body;
    const property = {
      ...data,
      id: firestore.collection("propertiesToRent").doc().id,
    };
    await firestore
      .collection("propertiesToRent")
      .doc(property.id)
      .set(property);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPropertyByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const propertiesCollection = firestore.collection("propertiesToRent");
    const propertySnapshot = await propertiesCollection
      .where("userId", "==", userId)
      .get();

    if (propertySnapshot.empty) {
      res.status(404).send("Property with the given userId not found !");
    } else {
      let propertyByUserId = [];
      propertySnapshot.forEach((doc) => {
        propertyByUserId.push({ ...doc.data(), id: doc.id });
      });
      res.send(propertyByUserId);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getPropertyToRent = async (req, res) => {
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

const searchProperties = async (req, res) => {
  const { availableFrom, availableTo, country } = req.query;

  if (!availableFrom && !availableTo && !country) {
    try {
      const propertiesToRent = await firestore.collection("propertiesToRent");
      const data = await propertiesToRent.get();
      const propertiesToRentArray = [];
      if (data.empty) {
        res.status(404).send("No property record found");
      } else {
        data.forEach((doc) => {
          const propertyToRent = new PropertyToRent(
            doc.id,
            doc.data().userId,
            doc.data().rating,
            doc.data().placeType,
            doc.data().propertyType,
            doc.data().roomType,
            doc.data().numberOfGuests,
            doc.data().numberOfBedrooms,
            doc.data().numberOfBeds,
            doc.data().numberOfBathrooms,
            doc.data().bathroomPrivate,
            doc.data().location,
            doc.data().amenities,
            doc.data().photos
          );
          propertiesToRentArray.push(propertyToRent);
        });
        res.send(propertiesToRentArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  if (!availableFrom && !availableTo && country) {
    try {
      const propertiesCollection = firestore.collection("propertiesToRent");
      const propertySnapshot = await propertiesCollection
        .where("location.country", "==", country)
        .get();

      if (propertySnapshot.empty) {
        res.status(404).send("Property with the given country not found !");
      } else {
        let propertyByCountry = [];
        propertySnapshot.forEach((doc) => {
          propertyByCountry.push({ ...doc.data(), id: doc.id });
        });
        res.send(propertyByCountry);
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  if (availableFrom && availableTo && !country) {
    try {
      const propertiesCollection = firestore.collection("propertiesToRent");
      const propertySnapshot = await propertiesCollection.get();
      if (propertySnapshot.empty) {
        res.status(404).send("Property with the given dates not found !");
      } else {
        let propertyByDates = [];
        propertySnapshot.forEach((doc) => {
          propertyByDates.push(doc.data());
        });
        res.send(
          propertyByDates.filter(
            (property) =>
              moment(property.location.availableFrom).isSameOrBefore(
                availableFrom
              ) &&
              moment(property.location.availableTo).isSameOrAfter(availableTo)
          )
        );
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  if (availableFrom && availableTo && country) {
    try {
      const propertiesCollection = firestore.collection("propertiesToRent");
      const propertySnapshot = await propertiesCollection
        .where("location.country", "==", country)
        .get();
      if (propertySnapshot.empty) {
        res.status(404).send("Property with the given dates not found !");
      } else {
        let propertyByDates = [];
        propertySnapshot.forEach((doc) => {
          propertyByDates.push(doc.data());
        });
        res.send(
          propertyByDates.filter(
            (property) =>
              (moment(property.location.availableFrom).isBefore(
                availableFrom
              ) &&
                moment(property.location.availableTo).isAfter(availableTo)) ||
              moment(property.location.availableFrom).isSame(availableFrom) ||
              moment(property.location.availableTo).isSame(availableTo)
          )
        );
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
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
  getAllPropertiesToRent,
  addPropertyToRent,
  getPropertyToRent,
  updatePropertyToRent,
  deletePropertyToRent,
  getPropertyByUserId,
  searchProperties,
};
