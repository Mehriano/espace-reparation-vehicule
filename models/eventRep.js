const Joi = require("joi");
const mongoose = require("mongoose");
const { etatSchema } = require("./etat");
const eventRepSchema = new mongoose.Schema({
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule"
  },
  prix: {
    type: Number
  },
  etat: {
    type: etatSchema,
    required: true
  },
  pieces: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pieceRechangeSchema"
      },
      dureeComande: {
        type: Date
      }
    }
  ],
  observation: {
    type: String,
    required: true
  },
  travailDemande: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  }, 
  seenClient:{
    type: Boolean
  },
  seenResp:{
    type: Boolean
  },
  issuedAt: {
    type: Date
  }

});
const EventRep = mongoose.model("EventRep", eventRepSchema);
function validateEventRep(eventRep) {
  const Schema = {
    vehiculeId: Joi.objectId(),
    prix: Joi.number(),
    etat: Joi.number().required(),
    pieces: Joi.array(),
    observation: Joi.string().required(),
    travailDemande: Joi.string().required(),
    start: Joi.date().required(),
    seenClient: Joi.boolean(),
    seenResp: Joi.boolean(),
    issuedAt: Joi.date()
  };
  return Joi.validate(eventRep, Schema);
}
exports.eventRepSchema = eventRepSchema;
exports.EventRep = EventRep;
exports.validate = validateEventRep;
