const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const traineesSchema = new Schema({
  student_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
  },

  Contact_info: {
    type: String,
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
  },
});

module.exports = mongoose.model("Trainess", traineesSchema);
