const express = require("express");
const { addLike, deleteLike } = require("../controllers/likeController");

const router = express.Router();

router.post("/addLike", addLike);
router.delete("/deleteLike", deleteLike);

module.exports = {
  routes: router,
};
