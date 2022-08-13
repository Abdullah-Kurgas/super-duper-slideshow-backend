const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://abdullah:h4sf175JShqCSWwP@cluster0.zirgk5q.mongodb.net/super-slideshow?retryWrites=true&w=majority";

const mongodb = new MongoClient(uri);
mongodb.connect(async (err, client) => {
  const { app, PORT } = require('./main');

  app.listen(PORT);
  console.log('App and Database are working');
});

module.exports = mongodb;