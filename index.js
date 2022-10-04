"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const userRoutes = require("./routes/user-routes.js");
const propertyToRentRoutes = require("./routes/propertyToRent-routes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const likeRoutes = require("./routes/likeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const cloudinary = require("cloudinary").v2;
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());

if (typeof config.cloudinaryConfig.cloud_name === "undefined") {
  console.warn("!! cloudinary config is undefined !!");
  console.warn("export CLOUDINARY_URL or set dotenv file");
} else {
  cloudinary.config({
    cloud_name: config.cloudinaryConfig.cloud_name,
    api_key: config.cloudinaryConfig.api_key,
    api_secret: config.cloudinaryConfig.api_secret,
  });
}

app.use("/api", userRoutes.routes);
app.use("/api", propertyToRentRoutes.routes);
app.use("/api", bookingsRoutes.routes);
app.use("/api", likeRoutes.routes);
app.use("/api", uploadRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
