"use strict";

const firebase = require("../db");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("users").doc().set(data);
    const id = req.params.id;
    // res.send("User saved successfuly");
    res.status(201).json({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      birthdate: data.birthdate,
      token: generateToken(data.id),
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await firestore.collection("users");
    const data = await users.get();
    const usersArray = [];
    if (data.empty) {
      res.status(404).send("No user record found");
    } else {
      data.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().firstName,
          doc.data().lastName,
          doc.data().email,
          doc.data().birthdate,
          doc.data().phoneNumber,
          doc.data().password
        );
        usersArray.push(user);
      });
      res.send(usersArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await firestore.collection("users").doc(id);
    const data = await user.get();
    if (!data.exists) {
      res.status(404).send("User with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const usersCollection = firestore.collection("users");
    const userSnapshot = await usersCollection
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty) {
      res.status(404).send("User with the given email not found !");
    } else {
      let user;
      userSnapshot.forEach((doc) => (user = { ...doc.data(), id: doc.id }));
      console.log("user from db:", user);
      res.send(user);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await firestore.collection("users").doc(id);
    await user.update(data);
    res.send("User record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("users").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
