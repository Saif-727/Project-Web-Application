const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Trainer = require("../model/trainerModel");

const permission = asyncHandler(async (req, res, next) => {
  let Token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      Token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(Token, process.env.Secret_Key);
      req.trainer = await Trainer.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Permission");
    }
  }
  if (!Token) {
    res.status(401);
    throw new Error("Wrong Token");
  }
});

module.exports = {
  permission,
};
