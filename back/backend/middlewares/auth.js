require("dotenv").config();
const asyncWrapper = require("../utils/asyncWrapper");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

const auth = asyncWrapper(async function (req, res, next) {
  const { token } = req.cookies;
  JWT.verify(token, secret, {}, (err, data) => {
    if (err) throw err;
    req.body.userId = data._id;
    next();
  });
});

module.exports = auth;
