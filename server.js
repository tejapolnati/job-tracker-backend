require("dotenv").config();
const express = require("express");
const jobRoutes = require("./routes/jobRoutes");
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/", authRoutes);
app.use("/", jobRoutes);
app.get("/", (req, res) => {
  res.send("Server working");
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});
