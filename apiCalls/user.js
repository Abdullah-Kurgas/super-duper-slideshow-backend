var conn = require("../mysqlConnection");

let executeLogin = (req, res) => {
  let { username, password } = req.body;

  let sql = `SELECT * FROM user WHERE username = ? AND password = ?`;

  conn.query(sql, [username, password], (err, result) => {
    delete result[0]?.password;

    if (result?.length == 0) return res.json({ msg: 'Wrong username or password.' });
    res.json(result[0] || {});
  });
};

let executeSignUp = (req, res) => {
  let {email, firstName, lastName, username, password} = req.body;
  
  let sql = `INSERT INTO user (email, first_name, last_name, username, password, created_at) VALUES(?, ?, ?, ?, ?, NOW())`;

  conn.query(sql, [email, firstName, lastName, username, password], (err, result)=>{
    console.log(result);
    res.json(result);
  })
}

module.exports = { executeLogin, executeSignUp };
