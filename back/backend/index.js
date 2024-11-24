require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/mongodb");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const ulcerRotes = require("./routes/ulcer.rotes");
const app = express();
const port = process.env.PORT;
const path = require("path");

dbConnection();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

// API endpoints
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.use("/user", userRoutes);
app.use("/ulcer", ulcerRotes);

app.use("*", (req, res) => {
  res.json({
    success: false,
    message: "Route Not Found",
    data: null,
    code: 404,
  });
});

app.use((err, req, res, next) => {
  if (err) {
    return res.json({
      success: false,
      message: err.message,
      data: null,
      code: err.code || 400,
    });
  }
});

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
