const Joi = require("joi");
const mongoose = require("mongoose");
const { pieceRechangeSchema } = require("./pieceRechange");
const eventRepSchema = new mongoose.Schema({
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule"
  },
  prix: {
    type: Number
  },
  etat: {
    type: String,
    required: true,
    enum: ["en attente de confirmation",
    "en cours de diagnostique",
    "en attente approvisionnemt commande",
    "en cours de reparation",
    "Done",
    "annulé"] // TO ADJUST LATER
  },
  pieces: [
    {
      type: [pieceRechangeSchema]
    }
  ],
  observation: {
    type: String,
    required: true
  },
  travauxDemande: {
    type: String,
    required: true
  },
  delaiLiv: {
    type: Date,
    required: true
  },
  dateRep: {
    type: Date
  }
});
const EventRep = mongoose.model("EventRep", eventRepSchema);
function validateEventRep(eventRep) {
  const Schema = {
    vehicule: Joi.objectId(),
    prix: Joi.number().required(),
    etat: Joi.string()
      .valid([
        "en attente de confirmation",
        "en cours de diagnostique",
        "en attente approvisionnemt commande",
        "en cours de reparation",
        "Done",
        "annulé"
      ])
      .required(),
    pieces: Joi.array(),
    observation: Joi.string().required(),
    travailDemande: Joi.string().required(),
    delaiLiv: Joi.date().required(),
    delaiRep: Joi.date()
  };
  return Joi.validate(eventRep, Schema);
}
exports.eventRepSchema = eventRepSchema;
exports.EventRep = EventRep;
exports.validate = validateEventRep;
