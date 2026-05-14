const db = require("../config/db");

exports.addJob = (req, res) => {
  const { company, role, status } = req.body;
  const user_id = req.user.id;

  const query = `
    INSERT INTO jobs (user_id, company, role, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [user_id, company, role, status], (err) => {
    if (err) {
      console.log(err);
      return res.send("Error adding job");
    }

    res.send("Job added");
  });
};

exports.getJobs = (req, res) => {
  const user_id = req.user.id;

  const query = "SELECT * FROM jobs WHERE user_id = ?";

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching jobs");
    }

    res.json(result);
  });
};

exports.updateJob = (req, res) => {
  const { id } = req.params;
  const { company, role, status } = req.body;
  const user_id = req.user.id;

  const query = `
    UPDATE jobs
    SET company = ?, role = ?, status = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    query,
    [company, role, status, id, user_id],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error updating job");
      }

      res.send("Job updated");
    }
  );
};

exports.deleteJob = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const query =
    "DELETE FROM jobs WHERE id = ? AND user_id = ?";

  db.query(query, [id, user_id], (err) => {
    if (err) {
      console.log(err);
      return res.send("Error deleting job");
    }

    res.send("Job deleted");
  });
};