const { Etat, validate } = require("../models/etat");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
//const

router.get("/", async (req, res) => {
  const etat = await Etat.find();
  res.send(etat);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const etat = new Etat({
    description: req.body.description,
    order: req.body.order
  });
  try {
    await etat.save();

    res.send(etat);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const etat = await Etat.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom
    },
    { new: true }
  );

  if (!etat) return res.status(404).send("etat not found.");

  res.send(etat);
});

router.delete("/:id", async (req, res) => {
  const etat = await Etat.findById(req.params.id);

  if (!etat) return res.status(404).send("etat not found.");
  etat.remove();
  res.send(etat);
});

router.get("/:id", async (req, res) => {
  const etat = await Etat.findById(req.params.id);

  if (!etat) return res.status(404).send("etat not found.");

  res.send(etat);
});

module.exports = router;
