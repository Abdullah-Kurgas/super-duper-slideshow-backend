var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var { executeLogin, executeSignUp } = require("./apiCalls/user") ;
var { getSlideshow, getSlideshows, createSlideshow, deleteSlideshow, editSlideshow } = require("./apiCalls/slideshow");
var { createSlide, editSlide, deleteSlide, getSlides } = require("./apiCalls/slide");

const PORT = process.env.PORT || 3305;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ test: "Selam alejkum" });
});

/* User Calls */
app.put("/executeLogin", executeLogin);
app.post("/executeSignUp", executeSignUp);

/* Slideshow Calls */
app.put('/getSlideshow', getSlideshow);
app.get('/getSlideshows/:id', getSlideshows);
app.post('/createSlideshow', createSlideshow);
app.put('/editSlideshow', editSlideshow);
app.delete('/deleteSlideshow/:url', deleteSlideshow);

/* Slide Calls */
app.get('/getSlides/:id', getSlides);
app.post('/createSlide', createSlide);
app.put('/editSlide', editSlide)
app.delete('/deleteSlide/:id', deleteSlide);


module.exports = {
  app,
  PORT
};
