"use strict";

const moment = require("moment");
const firebase = require("../db");
const Like = require("../models/like");
const PropertyToRent = require("../models/propertyToRent");
const firestore = firebase.firestore();

const getAllPropertiesToRent = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const propertiesToRent = await firestore.collection("propertiesToRent");
    const allLikes = await firestore.collection("likes").get();
    const userLikes = await firestore
      .collection("likes")
      .where("userId", "==", userId)
      .get();
    const data = await propertiesToRent.get();
    const propertiesToRentArray = [];
    const likesArray = [];
    const userLikesArray = [];

    allLikes.forEach((doc) => {
      const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
      likesArray.push(like);
    });
    userLikes.forEach((doc) => {
      const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
      userLikesArray.push(like);
    });

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
        doc.data().amenities
      );
      const findLike = userLikesArray.filter((like) => like.roomId === doc.id);
      const numberLikes = likesArray.filter(
        (like) => like.roomId === doc.id
      ).length;

      const isLiked = findLike.length > 0 ? true : false;
      propertiesToRentArray.push({ ...propertieToRent, numberLikes, isLiked });
    });
    res.send(propertiesToRentArray);
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
    const allLikes = await firestore.collection("likes").get();
    const likesArray = [];

    allLikes.forEach((doc) => {
      const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
      likesArray.push(like);
    });

    const propertiesCollection = firestore.collection("propertiesToRent");
    const propertySnapshot = await propertiesCollection
      .where("userId", "==", userId)
      .get();

    if (propertySnapshot.empty) {
      res.status(404).send("Property with the given userId not found !");
    } else {
      let propertyByUserId = [];
      propertySnapshot.forEach((doc) => {
        const numberLikes = likesArray.filter(
          (like) => like.roomId === doc.id
        ).length;

        propertyByUserId.push({
          ...doc.data(),
          id: doc.id,
          likes: numberLikes,
        });
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
    const allLikes = await firestore
      .collection("likes")
      .where("roomId", "==", id)
      .get();
    const likesArray = [];

    allLikes.forEach((doc) => {
      const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
      likesArray.push(like);
    });

    const propertyToRent = await firestore
      .collection("propertiesToRent")
      .doc(id);
    const data = await propertyToRent.get();
    if (!data.exists) {
      res.status(404).send("Property with the given ID not found");
    } else {
      res.send({ ...data.data(), likes: likesArray.length });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const searchProperties = async (req, res) => {
  const { availableFrom, availableTo, country, userId } = req.query;
  console.log(userId);

  if (!availableFrom && !availableTo && !country) {
    try {
      const propertiesToRent = await firestore.collection("propertiesToRent");
      const allLikes = await firestore.collection("likes").get();
      const userLikes = await firestore
        .collection("likes")
        .where("userId", "==", userId)
        .get();
      const data = await propertiesToRent.get();
      const propertiesToRentArray = [];
      const likesArray = [];
      const userLikesArray = [];

      allLikes.forEach((doc) => {
        const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
        likesArray.push(like);
      });
      userLikes.forEach((doc) => {
        const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
        userLikesArray.push(like);
      });

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
          doc.data().amenities
        );
        const findLike = userLikesArray.filter(
          (like) => like.roomId === doc.id
        );
        const numberLikes = likesArray.filter(
          (like) => like.roomId === doc.id
        ).length;

        const isLiked = findLike.length > 0 ? true : false;
        propertiesToRentArray.push({
          ...propertieToRent,
          numberLikes,
          isLiked,
        });
      });
      res.send(propertiesToRentArray);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  if (!availableFrom && !availableTo && country) {
    try {
      const likesArray = [];
      const userLikesArray = [];
      const allLikes = await firestore.collection("likes").get();
      const userLikes = await firestore
        .collection("likes")
        .where("userId", "==", userId)
        .get();
      const propertiesCollection = firestore.collection("propertiesToRent");
      const propertySnapshot = await propertiesCollection
        .where(
          "location.country",
          "==",
          country[0].toUpperCase() + country.substring(1)
        )
        .get();

      allLikes.forEach((doc) => {
        const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
        likesArray.push(like);
      });
      userLikes.forEach((doc) => {
        const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
        userLikesArray.push(like);
      });

      if (propertySnapshot.empty) {
        res.status(404).send("Property with the given country not found !");
      } else {
        let propertyByCountry = [];
        propertySnapshot.forEach((doc) => {
          const numberLikes = likesArray.filter(
            (like) => like.roomId === doc.id
          ).length;
          const findLike = userLikesArray.filter(
            (like) => like.roomId === doc.id
          );
          const isLiked = findLike.length > 0 ? true : false;
          propertyByCountry.push({
            ...doc.data(),
            id: doc.id,
            numberLikes,
            isLiked,
          });
        });
        res.send(propertyByCountry);
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  if (availableFrom && availableTo && !country) {
    try {
      const allLikes = await firestore.collection("likes").get();
      const userLikes = await firestore
        .collection("likes")
        .where("userId", "==", userId)
        .get();
      const likesArray = [];
      const userLikesArray = [];

      allLikes.forEach((doc) => {
        const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
        likesArray.push(like);
      });
      userLikes.forEach((doc) => {
        const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
        userLikesArray.push(like);
      });
      const propertiesCollection = firestore.collection("propertiesToRent");
      const propertySnapshot = await propertiesCollection.get();
      if (propertySnapshot.empty) {
        res.status(404).send("Property with the given dates not found !");
      } else {
        let propertyByDates = [];
        propertySnapshot.forEach((doc) => {
          propertyByDates.push(doc.data());
        });
        const filteredByDates = propertyByDates.filter(
          (property) =>
            moment(property.location.availableFrom).isSameOrBefore(
              availableFrom
            ) &&
            moment(property.location.availableTo).isSameOrAfter(availableTo)
        );
        const newData = filteredByDates.map((doc) => {
          const numberLikes = likesArray.filter(
            (like) => like.roomId === doc.id
          ).length;
          const findLike = userLikesArray.filter(
            (like) => like.roomId === doc.id
          );
          const isLiked = findLike.length > 0 ? true : false;
          const container = { ...doc, isLiked, numberLikes };
          return container;
        });
        res.send(newData);
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  if (availableFrom && availableTo && country) {
    try {
      const allLikes = await firestore.collection("likes").get();
      const userLikes = await firestore
        .collection("likes")
        .where("userId", "==", userId)
        .get();
      const likesArray = [];
      const userLikesArray = [];
      const propertiesCollection = firestore.collection("propertiesToRent");
      const propertySnapshot = await propertiesCollection
        .where(
          "location.country",
          "==",
          country[0].toUpperCase() + country.substring(1)
        )
        .get();
      allLikes.forEach((doc) => {
        const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
        likesArray.push(like);
      });
      userLikes.forEach((doc) => {
        const like = new Like(doc.id, doc.data().userId, doc.data().roomId);
        userLikesArray.push(like);
      });
      if (propertySnapshot.empty) {
        res.status(404).send("Property with the given dates not found !");
      } else {
        let propertyByDates = [];
        propertySnapshot.forEach((doc) => {
          propertyByDates.push(doc.data());
        });
        const filteredByDates = propertyByDates.filter(
          (property) =>
            moment(property.location.availableFrom).isSameOrBefore(
              availableFrom
            ) &&
            moment(property.location.availableTo).isSameOrAfter(availableTo)
        );
        const newData = filteredByDates.map((doc) => {
          const numberLikes = likesArray.filter(
            (like) => like.roomId === doc.id
          ).length;
          const findLike = userLikesArray.filter(
            (like) => like.roomId === doc.id
          );
          const isLiked = findLike.length > 0 ? true : false;
          const container = { ...doc, isLiked, numberLikes };
          return container;
        });
        res.send(newData);
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
