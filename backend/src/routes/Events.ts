import jwt from "jsonwebtoken";
import passport from "passport";
import axios from "axios";

import { Router } from "express";
import { minAuth } from "../middleware/auth";
const webhook = process.env.DISCORD_WEBHOOK;

const router = Router();
/** Middleware will be used for file uploading and storage on the backend */
router.post("/post", minAuth, (req, res) => {
  // For now, just testing the text/discord webhook
  // const { files } = req;

  const { postBody } = req.body;

  //const post = parseMarkdownImages(postBody);
  // Will want a function to parse out markdown images, since in discord they will just be posted
  // as attachments

  axios.post(webhook!, {
    content: postBody,
    username: "SBCC CS Club Announcements",
    avatar_url: "https://cdn.discordapp.com/attachments/1207787641169514556/1225588929324122192/SBCCCS_Logo.png?ex=6638bfe3&is=66376e63&hm=6ff33472bb20e8557a78b0eadf7423773a7698c1fd78fa7363356621e92c07aa&",
    tts: false,
    embeds: [], // Will include the files uploaded
  });

  res.status(200);
  return res.json({ message: "OK" });


});

export {
  router as Events,
};