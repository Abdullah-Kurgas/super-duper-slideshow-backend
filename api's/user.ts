var conn = require("../mysqlConnection");

let executeLogin = (req: any, res: any) => {
  let { email, password } = req.body;

  let sql = `SELECT * FROM super_slideshow.user WHERE email = ? AND password = ?`;

  conn.query(sql, [email, password], (err: Error, result: any) => {
    delete result[0]?.password;

    res.json(result);
  });
};

export { executeLogin };
