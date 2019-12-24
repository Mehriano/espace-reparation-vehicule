const { Vehicule } = require("../models/vehicule");
const { EventRep, validate } = require("../models/eventRep");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/user");
const { Etat } = require("../models/etat");

router.get("/", async (req, res) => {
  const events = await EventRep.find();
  res.send(events);
});
router.get("/vehicule/:id", async (req, res) => {
  const events = await EventRep.find({
    "vehicule._id": req.params.id
  });
  res.send(events);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const voiture = await Vehicule.findById(req.body.vehiculeId);
  if (!voiture) return res.status(404).send("voiture not found!");
  const etat = await Etat.find({ order: req.body.etat });
  if (!etat) return res.status(404).send("someting is wrong  not found!");

  const event = new EventRep({
    start: req.body.start,
    observation: req.body.observation ? req.body.observation : "None",
    travailDemande: req.body.travailDemande,
    etat: etat,
    vehicule: voiture._id,
    seenClient: true,
    seenResp: false,
    issuedAt: new Date()
  });
  try {
    await event.save();

    res.send(event);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const etat = await Etat.find({ order: req.body.etat.order });
  etat.seen = req.body.etat.seen;
  req.body.etat = etat;

  const event = await EventRep.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    { new: true }
  );

  if (!event) return res.status(404).send("event not found.");

  res.send(vehicule);
});

router.delete("/:id", auth, async (req, res) => {
  const vehicule = await Vehicule.findById(req.params.id);

  if (!vehicule) return res.status(404).send("vehicule not found.");
  vehicule.remove();
  res.send(vehicule);
});

router.get("/:id", async (req, res) => {
  const event = await EventRep.findById(req.params.id);

  if (!event) return res.status(404).send("Event not found.");

  res.send(event);
});

module.exports = router;
