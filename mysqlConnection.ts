var mysql = require("mysql2");

var conn = mysql.createConnection({
  host: "localhost",
  password: "53abc8dmitl",
  user: "root",
  database: "super_slideshow",
});

conn.connect((err: Error) => {
  if (err) throw err;
  console.log("Mysql is Connected");
});

module.exports = conn;
