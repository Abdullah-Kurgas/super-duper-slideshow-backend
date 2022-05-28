var conn = require("../mysqlConnection");

let executeLogin = (req, res) => {
  let { email, password } = req.body;

  let sql = `SELECT * FROM user WHERE email = ? AND password = ?`;

  conn.query(sql, [email, password], (err, result) => {
     delete result[0]?.password;

    res.json(result[0] || {});
  });
};

module.exports = { executeLogin };
