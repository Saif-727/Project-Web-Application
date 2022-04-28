const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject_num: {
    type: String,
  },
  role: {
    type: String,
    default: "USER",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Trainer", trainerSchema);
