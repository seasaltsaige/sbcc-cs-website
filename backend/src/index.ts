import express from "express";
import "dotenv/config";

import connect from "./database";
connect();

const app = express();




app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));