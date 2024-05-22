import multer from "multer";

import { Router } from "express";
import { minAuth } from "../middleware/auth";
import { pastEventStorage, upcomingEventStorage } from "../multer/diskStorage";
import FormData from "form-data";
import parseMarkdownImages from "../functions/parseMarkdownImages";
import fs from "fs";
import Event from "../database/Models/Event";
const webhook = process.env.DISCORD_WEBHOOK;
const upcomingEventUpload = multer({ storage: upcomingEventStorage })

const router = Router();

router.get("/past", async (req, res) => {

});

router.get("/upcoming", async (req, res) => {

});

/** Middleware will be used for file uploading and storage on the backend */
router.post("/post", minAuth, upcomingEventUpload.single("image"), async (req, res) => {
  // Files passed through form submission on frontend
  const image = req.file;
  const { eventTime, location, postBody, title } = req.body;
  const postedTime = Date.now();

  console.log(req.body);
  // console.log(postBody, eventTime, title, location, postedTime, image);
  // const post = parseMarkdownImages(postBody);
  try {

    const event = new Event({
      eventTime: eventTime,
      image: image?.filename,
      location,
      postBody,
      postedTime,
      rsvp: [],
      title,
    });


    await event.save();

    const form = new FormData();

    let eventDate = new Date(parseInt(eventTime));;

    const offSetRegex = /(-|\+)(\d{0,4})\s/g;
    const res = eventDate.toString().matchAll(offSetRegex).next().value;
    const type = res[1];
    const offset = parseInt(res[2]) / 100;

    if (type === "-") {
      eventDate = new Date(parseInt(eventTime) + offset * 1000 * 60 * 60);
    } else eventDate = new Date(parseInt(eventTime) - offset * 1000 * 60 * 60);


    console.log(eventDate);

    form.append("content", `### New Event Posted\n# ${title}\n### [${location}](https://www.google.com/maps/place/${location.replaceAll(/\s+/g, "+")})\n${eventDate.toLocaleString()}\n${postBody}`);
    form.append("username", "SBCC CS Club Announcements");
    form.append("avatar_url", process.env.WEBHOOK_PROFILE!);
    // Seems to be a max of 3 images using this method, since making an array and parsing to a string for form-data
    // wont work, as its a stream, not static
    // console.log(files); 
    if (image)
      form.append("file", fs.createReadStream(image?.path!));

    console.log(form);

    form.submit(webhook!);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
    return res.status(400);
  }

  res.status(200);
  return res.json({ message: "OK" });


});

router.delete("/delete/:_id", minAuth, async (req, res) => {

});

export {
  router as Events,
};