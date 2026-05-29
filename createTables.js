require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Connected");

  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255)
    )
  `;

  const jobsTable = `
    CREATE TABLE IF NOT EXISTS jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      company VARCHAR(255),
      role VARCHAR(255),
      status VARCHAR(255)
    )
  `;

  db.query(usersTable, (err) => {
    if (err) console.log(err);
    else console.log("users table created");
  });

  db.query(jobsTable, (err) => {
    if (err) console.log(err);
    else console.log("jobs table created");
  });
});