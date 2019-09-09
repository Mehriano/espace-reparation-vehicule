const Joi = require("joi");
const { usershema } = require("./user");
const mongoose = require("mongoose");
const vehiculeSchema = new mongoose.Schema({
  immatricularion: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  numChasis: {
    type: String,
    required: true
  },
  marque: {
    type: String
  },
  modele: {
    type: String,
    required: true
  },
  proprietaire: {
    type: usershema,
    required: true
  },
  kilometrage: {
    type: Number,
    required: true
  },
  dMC: {
    type: Date,
    required: true
  },
  sizeMoteur: {
    type: Number,
    required: true
  },
  energie: {
    type: String,
    enum: ["E", "D", "G"]
  }
});

const Vehicule = mongoose.model("Vehicule", vehiculeSchema);

function validateVehicule(vehicule) {
  const schema = {
    immatricularion: Joi.string()
      .min(5)
      .max(50)
      .regex(/^[0-9]+[A-z a-z]+[0-9]+$/)
      .required(),
    numChasis: Joi.string().required(),
    marque: Joi.string(),
    modele: Joi.string().required(),
    proprietaire: Joi.objectId(),
    kilometrage: Joi.number().required(),
    dMC: Joi.date().required(),
    sizeMoteur: Joi.number().required(),
    energie: Joi.string()
      .valid("E", "e", "D", "d", "g", "G")
      .required()
  };

  return Joi.validate(vehicule, schema);
}

exports.vehiculeSchema = vehiculeSchema;
exports.Vehicule = Vehicule;
exports.validate = validateVehicule;
