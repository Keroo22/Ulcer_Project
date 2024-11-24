const express = require("express");
const {
  getProfile,
  register,
  login,
} = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/register", register);
userRoutes.get("/profile", getProfile);

module.exports = userRoutes;
