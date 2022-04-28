const express = require("express");
const router = express.Router();
const {
  registerTrainer,
  loginTrainer,
  getTrainer,
} = require("../controller/trainerController");

const { permission } = require("../middleware/authPermission");

router
  .post("/", registerTrainer)
  .post("/login", loginTrainer)
  .get("/info", permission, getTrainer);

module.exports = router;
