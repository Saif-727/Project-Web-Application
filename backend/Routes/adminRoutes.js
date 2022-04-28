const express = require("express");
const router = express.Router();
const {
  getTrainers,
  getTrainess,
  setAdmin,
} = require("../controller/adminController");

const { permission } = require("../middleware/authPermission");

const { permissionAdmin } = require("../middleware/authorization");
router
  .get("/Alltrainess", permission, permissionAdmin, getTrainess)
  .get("/Alltrainer", permission, permissionAdmin, getTrainers)
  .put("/authors/:id", permission, permissionAdmin, setAdmin);

module.exports = router;
