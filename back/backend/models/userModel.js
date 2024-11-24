const { Schema, models, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    ulcers: {
      type: Array,
      default: [],
    },
  },
  { minimize: false }
);

module.exports = models.User || model("User", userSchema);
