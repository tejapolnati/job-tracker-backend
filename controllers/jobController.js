const db = require("../config/db");

exports.addJob = (req, res) => {

  const { company, role, status } = req.body;

  const user_id = req.user.id;

  const query = `
    INSERT INTO jobs (user_id, company, role, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [user_id, company, role, status],
    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(201).json({
        success: true,
        message: "Job added"
      });
    }
  );
};

exports.getJobs = (req, res) => {

  const user_id = req.user.id;

  const query =
    "SELECT * FROM jobs WHERE user_id = ?";

  db.query(
    query,
    [user_id],
    (err, results) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(200).json(results);
    }
  );
};

exports.updateJob = (req, res) => {

  const { id } = req.params;

  const { status } = req.body;

  const user_id = req.user.id;

  const query = `
    UPDATE jobs
    SET status = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    query,
    [status, id, user_id],
    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(200).json({
        success: true,
        message: "Job updated"
      });
    }
  );
};

exports.deleteJob = (req, res) => {

  const { id } = req.params;

  const user_id = req.user.id;

  const query = `
    DELETE FROM jobs
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    query,
    [id, user_id],
    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(200).json({
        success: true,
        message: "Job deleted"
      });
    }
  );
};