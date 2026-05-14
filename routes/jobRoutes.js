const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.post("/add-job", auth, addJob);

router.get("/jobs", auth, getJobs);

router.put("/update-job/:id", auth, updateJob);

router.delete("/delete-job/:id", auth, deleteJob);

module.exports = router;