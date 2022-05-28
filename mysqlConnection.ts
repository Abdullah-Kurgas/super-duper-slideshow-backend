var mysql = require("mysql2");

var conn = mysql.createConnection({
  host: "b24i45k203cwhxoycsxz-mysql.services.clever-cloud.com",
  password: "Q0lrPcNfOBpshjrQA4ee",
  user: "u8qcoxfr67ljbwll",
  database: "b24i45k203cwhxoycsxz",
});

conn.connect((err: Error) => {
  if (err) throw err;
  console.log("Mysql is Connected");
});

module.exports = conn;
