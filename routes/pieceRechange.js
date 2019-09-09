const { PieceRechange, validate } = require("../models/pieceRechange");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const pieceRechange = await PieceRechange.find();
  res.send(pieceRechange);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const pieceRechange = await PieceRechange.findOneAndUpdate(
    {
      numSerie: req.body.numSerie
    },
    req.body,
    { new: true }
  );
  if (pieceRechange) return res.status(200).send(pieceRechange);
  pieceRechange = new pieceRechange({
    nom: req.body.nom
  });
  try {
    await pieceRechange.save();

    return res.send(pieceRechange);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = router;
