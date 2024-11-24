const { Schema, models, model } = require("mongoose");

const ulcerSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  degree: {
    type: Number,
    default: null,
  },
  isDegreeSpecified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = models.Ulcer || model("Ulcer", ulcerSchema);
