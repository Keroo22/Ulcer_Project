const Ulcer = require("../models/UlcerModel");
const User = require("../models/userModel");
const asyncWrapper = require("../utils/asyncWrapper");

const addUlcer = asyncWrapper(async (req, res, next) => {
  const { userId, userName } = req.body;
  const image = `${req.file.filename}`;
  await Ulcer.create({
    userId,
    userName,
    image,
  });
  const userUlcers = await Ulcer.find({ userId }, { __v: false });
  await User.findByIdAndUpdate(userId, { ulcers: userUlcers });
  res.json({
    success: true,
    message: "Item Added Successfully",
    data: null,
    code: 201,
  });
});

const addDegreeOfUlcer = asyncWrapper(async function (req, res, next) {
  const { id, degree } = req.body;
  const ulcer = await Ulcer.findById(id);
  await Ulcer.findByIdAndUpdate(id, {
    degree,
    isDegreeSpecified: true,
  });
  const userUlcers = await Ulcer.find({ userId: ulcer.userId });
  await User.findByIdAndUpdate(ulcer.userId, { ulcers: userUlcers });
  res.json({
    success: true,
    message: "Degree is specified",
    data: null,
    code: 200,
  });
});

const getUlcers = asyncWrapper(async function (req, res, next) {
  const ulcers = await Ulcer.find({}, { __v: false });
  res.json({
    success: true,
    message: "All ulcers",
    data: ulcers,
    code: 200,
  });
});

const getUserUlcers = asyncWrapper(async function (req, res, next) {
  const { userId } = req.body;
  const user = await User.findById(userId);
  res.json({
    success: true,
    message: `Profile ulcers`,
    data: user.ulcers,
    code: 200,
  });
});

module.exports = {
  addUlcer,
  addDegreeOfUlcer,
  getUlcers,
  getUserUlcers,
};
