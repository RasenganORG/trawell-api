const express = require("express");

const { uploadFile, getFiles } = require("../controllers/uploadController");

const router = express.Router();

router.post("/uploads", uploadFile);
router.get("/files", getFiles);

module.exports = {
  routes: router,
};
