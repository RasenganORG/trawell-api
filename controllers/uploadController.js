"use strict";

const cloudinary = require("cloudinary").v2;

const uploadFile = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "trawell_preset",
    });
    console.log(uploadResponse);
    res.json({ msg: "bine binee" });
  } catch (error) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

const getFiles = async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:trawell-app")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
};

module.exports = {
  uploadFile,
  getFiles,
};
