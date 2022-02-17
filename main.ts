import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { executeLogin } from "./api's/user";

const PORT = 3000;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: any, res: any) => {
  res.send({ test: "Selam alejkum" });
});

/* User execute's */
app.put("/executeLogin", executeLogin);
////////////////////

app.listen(PORT, () => {
  console.log("App started");
});
