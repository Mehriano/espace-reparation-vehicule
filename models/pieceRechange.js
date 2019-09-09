const Joi = require("joi");
const mongoose = require("mongoose");
const pieceRechangeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  numSerie: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  disponible: {
    type: Boolean,
    required: true
  },
  dureeComande: {
    type: Date
  }
});
const PieceRechange = mongoose.model("PieceRechange", pieceRechangeSchema);

function validatePieceRechange(pieceRechange) {
  const schema = {
    nom: Joi.string().required(),
    numSerie: Joi.string().required(),
    prix: Joi.number().required(),
    disponible: Joi.boolean().required(),
    dureeComande: Joi.date().when("disponible", {
      is: false,
      then: Joi.required()
    })
  };
  return Joi.validate(pieceRechange, schema);
}

exports.pieceRechangeSchema = pieceRechangeSchema;
exports.PieceRechange = PieceRechange;
exports.validate = validatePieceRechange;
