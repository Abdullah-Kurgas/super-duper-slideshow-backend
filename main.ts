var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

import { executeLogin } from "./apiCalls/user";
import { getUuid, getSlideshow, getSlideshows, createSlideshow, deleteSlideshow, editSlideshow } from "./apiCalls/slideshow";
import { createSlide, editSlide, deleteSlide } from "./apiCalls/slide";

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
app.put('/getSlideshow', getSlideshow);
app.get('/getSlideshows/:id', getSlideshows);
app.post('/createSlideshow', createSlideshow);
app.put('/editSlideshow', editSlideshow);
app.delete('/deleteSlideshow/:id', deleteSlideshow);

/* Slide Calls */
app.post('/createSlide', createSlide);
app.put('/editSlide', editSlide)
app.delete('/deleteSlide/:id', deleteSlide);


app.listen(PORT, () => {
  console.log("App started");
});
