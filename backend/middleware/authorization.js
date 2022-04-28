const asyncHandler = require("express-async-handler");

const permissionAdmin = asyncHandler(async (req, res, next) => {
  if (req.trainer.role !== "ADMIN") {
    res.status(401);
    throw new Error(" You are not have permission ");
  }
  next();
});

module.exports = {
  permissionAdmin,
};
