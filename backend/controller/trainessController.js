
const asyncHandler = require("express-async-handler");

const Trainess = require("../model/trainessModel");
const Trainer = require("../model/trainerModel");

//1
const getTrainess = asyncHandler(async (req, res) => {
  const trainess = await Trainess.find({ trainer: req.trainer.id });
  if (!trainess) {
    return res.status(404).send("No Found Trainess");
  }
  res.status(200).json({ trainess });
});

//2
const creatTrainess = asyncHandler(async (req, res) => {
  const {student_name, Contact_info, specialization , id } = req.body;
  let trainess = new Trainess({
    student_name,
    Contact_info,
    specialization,
    trainer: req.trainer.id,
  });
  await trainess.save();
  if (!trainess) {
    res.status(400);
    throw new Error("There is No Trainess ");
  }
  res.status(200).json({ trainess });
});
//3
const updateTrainess = asyncHandler(async (req, res) => {
  const trainess = await Trainer.findById(req.params.id);
  if (!trainess) {
    res.status(400);
    throw new Error("Trainess not Found");
  }
  const trainer = await Trainer.findById(req.trainer.id);
  if (!trainer) {
    res.status(401);
    throw new Error("Trainer not found");
  }
  if (trainess.trainer.toString() !== trainer.id) {
    res.status(401);
    throw new Error("You are not Authorized");
  }
 //4
  const updatedTrainess = await Trainess.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTrainess);
});

//5
const deleteTrainess = asyncHandler(async (req, res) => {
  const trainess = await Trainess.findByIdAndRemove(req.params.id);
  if (!trainess) {
    res.status(400);
    throw new Error(" Not Found");
  }
  const trainer = await Trainer.findById(req.trainer.id);
  if (!trainer) {
    res.status(401);
    throw new Error("Trainer not found");
  }
  if (trainess.trainer.toString() !== trainer.id) {
    res.status(401);
    throw new Error("You are not Authorized");
  }
  res.status(200).json(" Trainess is deleted");
});

module.exports = {
  getTrainess,
  creatTrainess,
  updateTrainess,
  deleteTrainess,
};
