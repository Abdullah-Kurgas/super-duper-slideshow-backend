var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var { executeLogin } = require("./apiCalls/user");
var { getUuid,getSlideshow, createSlideshow } = require('./apiCalls/slideshow');

const PORT = 3000;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: any, res: any) => {
  res.send({ test: "Selam alejkum" });
});

/* User Calls */
app.put("/executeLogin", executeLogin);

/* Slideshow Calls */
app.get('/getUuid', getUuid);
app.get('/getSlideshow/:url', getSlideshow);
app.post('/createSlideshow', createSlideshow);


app.listen(PORT, () => {
  console.log("App started");
});
