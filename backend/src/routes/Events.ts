import multer from "multer";
import { Router, Express } from "express";
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
  try {
    const allEvents = await Event.find();
    const now = Date.now();
    res.status(200);
    res.json({
      events: allEvents.map(ev => ({
        // backend image name
        images: ev.images,
        // address
        location: ev.location,
        // Text for post
        postBody: ev.postBody,
        // Time posted at
        postedTime: ev.postedTime,
        // Time event is at
        eventTime: ev.eventTime,
        // List of names rsvp'd
        rsvp: ev.rsvp,
        // Title of event
        title: ev.title,
        _id: ev._id,
      })).filter((ev) => ev.eventTime! > now).sort((a, b) => a.eventTime! - b.eventTime!),
    });


  } catch (err) {
    res.status(500);
    return res.json({ message: "Internal Server Error" });
  }

});



/** Middleware will be used for file uploading and storage on the backend */
router.post("/post", minAuth, upcomingEventUpload.any(), async (req, res) => {
  // Files passed through form submission on frontend
  const images = (req.files as Express.Multer.File[]);

  const { eventTime, location, postBody, title } = req.body;
  const postedTime = Date.now();

  try {

    const event = new Event({
      eventTime: eventTime,
      images: images.map(i => i.filename),
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


    form.append("content", `### New Event Posted\n# ${title}\n### [${location}](https://www.google.com/maps/place/${location.replaceAll(/\s+/g, "+")})\n${eventDate.toLocaleString()}\n${postBody}`);
    form.append("username", "SBCC CS Club Announcements");
    form.append("avatar_url", process.env.WEBHOOK_PROFILE!);
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      form.append(`file-${i}`, fs.createReadStream(file.path));
    }

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