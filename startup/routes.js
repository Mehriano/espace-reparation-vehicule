const express = require("express");
const user = require("../routes/user");
const auth = require("../routes/auth");
const vehicule = require("../routes/vehicule");
const pieceRechange = require("../routes/pieceRechange");
const events = require("../routes/events");
const etat = require("../routes/etat");

//const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/vehicules", vehicule);
  app.use("/api/piecederechanges", pieceRechange);
  app.use("/api/events", events);
  app.use("/api/etats", etat);
};
