const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const Trainer = require("../model/trainerModel");
const { json } = require("express/lib/response");
//1
const registerTrainer = asyncHandler(async (req, res) => {
  const { name, subject_num, email, password } = req.body;
  if (!name || !subject_num || !email || !password) {
    res.status(400);
    throw new Error("please add all info");
  }

  const trainerExists = await Trainer.findOne({ email });
  if (trainerExists) {
    res.status(400);
    throw new Error("already exists");
  }

  const salt = await bcrypt.genSalt(8);
  const hashPassword = await bcrypt.hash(password, salt); 

  //2
  const trainer = await Trainer.create({
    name,
    subject_num,
    email,
    password: hashPassword,
  });
  if (trainer) {
    res.status(201).json({
      _id: trainer.id,
      name: trainer.email,
      subject_num: trainer.subject_num,
      email: trainer.email,
      token: genToken(trainer._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Info");
  }
});

//3
const loginTrainer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const trainer = await Trainer.findOne({ email });
  if (trainer && (await bcrypt.compare(password, trainer.password))) {
    res.json({
      _id: trainer.id,
      name: trainer.email,
      subject_num: trainer.subject_num,
      email: trainer.email,
      token: genToken(trainer._id),
    });
  } else {
    res.status(400);
    throw new Error(" Email or Password Incorrect");
  }

  res.json({ message: "Login Trainer" });
});

//4
const getTrainer = asyncHandler(async (req, res) => {
  const { _id, name, subject_num, email } = await Trainer.findById(
    req.trainer.id
  );
  res.status(200).json({
    id: _id,
    name,
    subject_num,
    email,
  });
});


const genToken = (id) => {
  return jwt.sign({ id }, process.env.Secret_Key, {
    expiresIn: "50d",
  });
};

module.exports = {
  registerTrainer,
  loginTrainer,
  getTrainer,
};

// protect all project
