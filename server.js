const express = require("express");
const app = express();
const jobRoutes = require("./routes/jobRoutes");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use("/", authRoutes);
app.use("/", jobRoutes);

app.get("/", (req, res) => {
  res.send("Server working");
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});
