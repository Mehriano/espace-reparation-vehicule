const { Vehicule, validate } = require("../models/vehicule");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const vehicule = await Vehicule.find();
  res.send(vehicule);
});
router.get("/userid/:id", async (req, res) => {
  const vehicule = await Vehicule.find({ "proprietaire._id": req.params.id });
  res.send(vehicule);
});
router.get("/proprietaire/:nom", async (req, res) => {
  const vehicule = await Vehicule.find({
    "proprietaire.nom": req.params.nom
  });
  res.send(vehicule);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const prop = await User.findById(req.body.proprietaire);
  if (!prop) return res.status(404).send("can't find this user!!!");

  const vehicule = new Vehicule({
    dMC: req.body.dMC,
    energie: req.body.energie,
    immatriculation: req.body.immatriculation,
    kilometrage: req.body.kilometrage,
    marque: req.body.marque,
    modele: req.body.modele,
    numChasis: req.body.numChasis,
    sizeMoteur: req.body.sizeMoteur,
    proprietaire: prop
  });
  try {
    await vehicule.save();

    res.send(vehicule);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const vehicule = await Vehicule.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom
    },
    { new: true }
  );

  if (!vehicule) return res.status(404).send("vehicule not found.");

  res.send(vehicule);
});

router.delete("/:id", auth, async (req, res) => {
  const vehicule = await Vehicule.findById(req.params.id);

  if (!vehicule) return res.status(404).send("vehicule not found.");
  vehicule.remove();
  res.send(vehicule);
});

router.get("/:id", async (req, res) => {
  const vehicule = await Vehicule.findById(req.params.id);

  if (!vehicule) return res.status(404).send("vehicule not found.");

  res.send(vehicule);
});

module.exports = router;
