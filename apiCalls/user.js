const { ObjectId } = require("mongodb");
const mongodb = require("../mysqlConnection");
const { generateUuid, getElementById, returnResponseMsg } = require("./action-service");

const db = mongodb.db();

let executeLogin = (req, res) => {
  let { username, password } = req.body;

  db.collection('user').findOne({ username, password }, (err, result) => {
    if (!result) return res.json({ msg: 'Incorrect username or password' })

    delete result.password;

    res.json(result)
  })
};

let executeSignUp = (req, res) => {
  let generatedUuid = generateUuid();
  let { username, email, role, createdAt } = req.body;

  if (role == 'QUEST') {

    db.collection('user').insertOne({
      username: 'quest-' + generatedUuid,
      role: role,
      password: generatedUuid,
      createdAt: new Date()
    }, async (err, result) => {
      if (err) throw err;
      let user = await getElementById(result.insertedId, 'user');

      res.json(user);
    })
  }
}

let getUsers = async (req, res) => {
  let users = await db.collection('user').find({ role: 'QUEST' }).toArray();
  
  res.json(users);
}

let deleteUser = async (req, res) => {
  let { id } = req.params;
  
  let deletedUser = await db.collection('user').deleteOne({ _id: ObjectId(id) });

  res.json({ ...deletedUser, msg: returnResponseMsg('user', 'delete') });

}

module.exports = { executeLogin, executeSignUp, getUsers, deleteUser };
