import multer from "multer";

import { Router } from "express";
import { minAuth } from "../middleware/auth";
import { eventStorage } from "../multer/diskStorage";
import FormData from "form-data";
import parseMarkdownImages from "../functions/parseMarkdownImages";

const webhook = process.env.DISCORD_WEBHOOK;
const eventUpload = multer({ storage: eventStorage })

const router = Router();

/** Middleware will be used for file uploading and storage on the backend */
router.post("/post", minAuth, eventUpload.array("images"), async (req, res) => {
  // Files passed through form submission on frontend
  const { files } = req;
  const { postBody } = req.body;

  const post = parseMarkdownImages(postBody);
  try {
    const form = new FormData();

    form.append("content", post);
    form.append('username', "SBCC CS Club Announcements");
    form.append('avatar_url', process.env.WEBHOOK_PROFILE!);
    // Seems to be a max of 3 images using this method, since making an array and parsing to a string for form-data
    // wont work, as its a stream, not static
    console.log(files);
    //form.append('file', fs.createReadStream("./src/routes/test.png"));
    //form.append('files', fs.createReadStream("./src/routes/aaa.png"));

    form.submit(webhook!);
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