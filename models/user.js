const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  prenom: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  cin: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  fax: {
    type: String
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  role: {
    type: String,
    required: true,
    enum: ["Administrateur", "Responsable", "Client", "None"]
  },
  adresse: {
    ville: {
      type: String
    },
    zone: {
      type: String
    },
    rue: {
      type: String
    },
    codePostal: {
      type: String
    }
  },
  voitures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicule" }]
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      role: this.role,
      userName: this.userName
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const adresseSchema = Joi.object().keys({
    ville: Joi.string()
      .min(3)
      .max(30),
    zone: Joi.string()
      .min(3)
      .max(30),
    rue: Joi.string()
      .min(3)
      .max(30),
    codePostal: Joi.string()
  });
  const schema = Joi.object({
    nom: Joi.string()
      .min(5)
      .max(50)
      .required(),
    prenom: Joi.string()
      .min(5)
      .max(50)
      .required(),
    userName: Joi.string()
      .min(5)
      .max(50)
      .required(),
    cin: Joi.string()
      .regex(/^[0-9]{8}$/)
      .required(), // To Do Number must be at least 8 characters + concidering changing from int to string
    phone: Joi.string()
      .regex(/^[0-9]{8}$/)
      .required(), //  To Do regex  to form a valid phoneNumber
    fax: Joi.string()
      .regex(/^[0-9]{8}$/)
      .required(), //  To Do regex  to form a valid phoneNumber
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    role: Joi.string()
      .valid("Administrateur", "Responsable", "Client", "None")
      .required(),
    //  voitures: Joi.array().items(Joi.ObjectId),
    adresse: adresseSchema
  });

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.usershema = userSchema;
