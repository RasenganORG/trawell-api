const firebase = require("../db");
const Like = require("../models/like");
const firestore = firebase.firestore();

const addLike = async (req, res, next) => {
  try {
    const data = req.body;
    const likeRef = await firestore.collection("likes").doc();
    likeRef.set(data);
    res.send(likeRef);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const del = async (id) => {
  try {
    await firestore.collection("likes").doc(id).delete();

    console.log("Record deleted successfuly");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const data = req.body.data;
    console.log(data);
    const like = await firestore
      .collection("likes")
      .where("userId", "==", data.userId)
      .where("roomId", "==", data.roomId)
      .get();

    like.forEach((doc) => {
      del(doc.id);
    });

    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addLike,
  deleteLike,
};
