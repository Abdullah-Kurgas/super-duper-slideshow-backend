var conn = require("../mysqlConnection");

let executeLogin = (req, res) => {
  let { username, password } = req.body;

  let sql = `SELECT * FROM user WHERE username = ? AND password = ?`;

  conn.query(sql, [username, password], (err, result) => {
    if (err) throw Error(err.errno);

    if (result?.length == 0) {
      res.json({ msg: 'Wrong username or password.' });
      return;
    };

    delete result?.[0]?.password;

    res.json(result?.[0] || {});
  });
};

let executeSignUp = (req, res) => {
  let { email, username, password } = req.body;

  let sql = `INSERT INTO user (email, username, password, created_at) VALUES(?, ?, ?, NOW())`;

  conn.query(sql, [email, username, password], (err, result) => {
    if (err) throw Error(err.errno);
    conn.query('SELECT * FROM user WHERE id = ?', [result.insertId], (err2, result2) => {
      if (err2) throw err2;

      delete result2?.[0]?.password;
      res.json(result2?.[0] || {});
    })
  })
}

module.exports = { executeLogin, executeSignUp };
