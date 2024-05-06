import express from "express";
import "dotenv/config";
import cors from "cors";
import {
  Auth,
  Events,
  Officers
} from "./routes/index";

import parseMarkdownImages from "./functions/parseMarkdownImages";

// const tested = parseMarkdownImages("# This is a test for the ![Regex](./image.png)\n\nHere is a second one! ![something](else.png)");
// console.log(tested);

import connect from "./database";
connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", Auth);
app.use("/events", Events);
app.use("/officers", Officers);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));