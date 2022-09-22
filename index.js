"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const userRoutes = require("./routes/user-routes.js");
const propertyToRentRoutes = require("./routes/propertyToRent-routes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const likeRoutes = require("./routes/likeRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRoutes.routes);
app.use("/api", propertyToRentRoutes.routes);
app.use("/api", bookingsRoutes.routes);
app.use("/api", likeRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
