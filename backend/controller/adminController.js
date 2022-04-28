const asyncHandler = require("express-async-handler");
const Trainer = require("../model/trainerModel");
const Trainess = require("../model/trainessModel");


const getTrainers = asyncHandler(async (req, res) => {
  const trainers = await Trainer.find({});
  if (!trainers) {
    return res.status(404).send("No Have any Trainer");
  }
  res.status(200).json({ trainers });
});

const getTrainess = asyncHandler(async (req, res) => {
  const trainess = await Trainess.find({});
  if (!trainess) {
    return res.status(404).send("No Have any Trainess");
  }
  res.status(200).json({ trainess });
});

const setAdmin = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findByIdAndUpdate(
    { _id: req.params.id },
    { role: "ADMIN" },
    { new: true }
  );
  if (!trainer) {
    return res.status(404).send("No Found");
  }
  res.status(200).json({ trainer });
});

module.exports = {
  getTrainers,
  getTrainess,
  setAdmin,
};
