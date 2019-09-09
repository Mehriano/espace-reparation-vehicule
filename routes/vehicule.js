const { Vehicule, validate } = require("../models/vehicule");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const vehicule = await Vehicule.find();
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

  const vehicule = new Vehicule({
    nom: req.body.nom
  });
  try {
    await Vehicule.save();

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
