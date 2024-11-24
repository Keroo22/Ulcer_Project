const express = require("express");
const {
  addDegreeOfUlcer,
  addUlcer,
  getUlcers,
  getUserUlcers,
} = require("../controllers/ulcers.controller");
const ulcerRotes = express.Router();
const multer = require("multer");
const auth = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now().toString() + file.originalname}`);
  },
});
const upload = multer({ storage: storage });

ulcerRotes.post("/add", upload.single("image"), auth, addUlcer);
ulcerRotes.post("/specifyDegree", addDegreeOfUlcer);
ulcerRotes.get("/all", getUlcers);
ulcerRotes.get("/userUlcers", auth, getUserUlcers);

module.exports = ulcerRotes;
