var mysql = require('mysql');

var conn = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql is Connected");
});

module.exports = conn;
