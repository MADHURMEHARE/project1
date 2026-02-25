const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // IMPORTANT
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());              // VERY IMPORTANT
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/registerApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});