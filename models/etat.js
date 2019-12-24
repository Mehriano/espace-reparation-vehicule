const Joi = require("joi");
const mongoose = require("mongoose");

const etatschema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  seen: {
    type: Date
  }
});

const Etat = mongoose.model("Etat", etatschema);

function validateEtat(etat) {
  const schema = {
    description: Joi.string()
      .min(5)
      .max(50)
      .required(),
    order: Joi.number().required(),
    seen: Joi.date()
  };

  return Joi.validate(etat, schema);
}

exports.etatSchema = etatschema;
exports.Etat = Etat;
exports.validate = validateEtat;
