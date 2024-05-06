import axios from "axios";
import multer from "multer";

import { Router } from "express";
import { minAuth } from "../middleware/auth";
import { eventStorage } from "../multer/diskStorage";
import parseMarkdownImages from "../functions/parseMarkdownImages";

import path from "path";

const webhook = process.env.DISCORD_WEBHOOK;
const eventUpload = multer({ storage: eventStorage })

const router = Router();
/** Middleware will be used for file uploading and storage on the backend */
router.post("/post", minAuth, eventUpload.any(), async (req, res) => {
  // Files passed through form submission on frontend
  const { files } = req;
  const { postBody } = req.body;

  const post = parseMarkdownImages(postBody);
  try {
    await axios.post(webhook!, {
      content: post,
      username: "SBCC CS Club Announcements",
      avatar_url: "https://cdn.discordapp.com/attachments/1207787641169514556/1225588929324122192/SBCCCS_Logo.png?ex=6638bfe3&is=66376e63&hm=6ff33472bb20e8557a78b0eadf7423773a7698c1fd78fa7363356621e92c07aa&",
      tts: false,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
    return res.status(400);
  }

  res.status(200);
  return res.json({ message: "OK" });


});

export {
  router as Events,
};