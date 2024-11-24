const { isEmail } = require("validator");
const asyncWrapper = require("../utils/asyncWrapper");
const appError = require("../utils/appError");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET_KEY;

function createToken(data) {
  const { _id, userName, email, password, ulcers, role } = data;
  const token = JWT.sign(
    { _id, userName, email, password, ulcers, role },
    secret,
    {
      expiresIn: "30d",
    }
  );
  return token;
}

const register = asyncWrapper(async function (req, res, next) {
  const { userName, email, password, role } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    const newError = appError.create(false, "This email already exist", 400);
    return next(newError);
  }
  if (!isEmail) {
    const newError = appError.create(false, "This is not email", 400);
    return next(newError);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    userName,
    email,
    password: hashedPass,
    role,
    ulcers: [],
  });
  const token = createToken(newUser);
  res.cookie("token", token).json({
    success: true,
    message: "Registered successfully",
    data: null,
    code: 200,
  });
});

const login = asyncWrapper(async function (req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const newError = appError.create(false, "User doesn't exist", 404);
    return next(newError);
  }
  const correctPass = await bcrypt.compare(password, user.password);
  if (!correctPass) {
    const newError = appError.create(false, "Wrong password", 400);
    return next(newError);
  }
  const token = createToken(user);
  res.cookie("token", token).json({
    success: true,
    message: "Logged in successfully",
    data: null,
    code: 200,
  });
});

const getProfile = asyncWrapper(async function (req, res, next) {
  const { token } = req.cookies;
  JWT.verify(token, secret, {}, (err, data) => {
    if (err) throw err;
    res.json({
      success: true,
      message: "Profile data",
      data,
      code: 200,
    });
  });
});

module.exports = {
  register,
  login,
  getProfile,
};
