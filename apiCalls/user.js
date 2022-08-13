const mongodb = require("../mysqlConnection");

const db = mongodb.db();

let executeLogin = (req, res) => {
  let { username, password } = req.body;

  db.collection('user').findOne({username, password}, (err, result)=>{
    if(!result) return res.json({msg: 'Incorrect username or password'})

    delete result.password;

    res.json(result)
  })
}; 

let executeSignUp = (req, res) => {
  let { email, username, password } = req.body;

  let sql = `INSERT INTO user (email, username, password, created_at) VALUES(?, ?, ?, NOW())`;
}

module.exports = { executeLogin, executeSignUp };
