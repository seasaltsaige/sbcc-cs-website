import multer from "multer";
import { Router, Express } from "express";
import { minAuth } from "../middleware/auth";
import { pastEventStorage, upcomingEventStorage } from "../multer/diskStorage";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import UpcomingEvent from "../database/Models/UpcomingEvent";
const webhook = process.env.DISCORD_WEBHOOK;
const upcomingEventUpload = multer({ storage: upcomingEventStorage })

const router = Router();

router.get("/past", async (req, res) => {

});

router.get("/upcoming", async (req, res) => {
  try {
    const allEvents = await UpcomingEvent.find();
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
router.post("/upcoming/post", minAuth, upcomingEventUpload.any(), async (req, res) => {
  // Files passed through form submission on frontend
  const images = (req.files as Express.Multer.File[]);

  const { eventTime, location, postBody, title } = req.body;
  const postedTime = Date.now();

  try {
    const event = new UpcomingEvent({
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
    const result = eventDate.toString().matchAll(offSetRegex).next().value;
    const type = result[1];
    const offset = parseInt(result[2]) / 100;

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
    res.json({ message: err });
    return res.status(400);
  }

  res.status(200);
  return res.json({ message: "OK" });
});

router.patch("/upcoming/:_id", minAuth, upcomingEventUpload.any(), async (req, res) => {
  const { _id } = req.params;
  const { newEventParts } = req.body;

  if (!newEventParts) {
    res.status(400);
    return res.json({
      message: "Malformed request body",
    });
  }

  const images = (req.files as Express.Multer.File[]);

  try {
    const old = await UpcomingEvent.findById(_id);
    if (!old) {
      res.status(404);
      return res.json({ message: "Model with id not found" });
    }
    if (images.length > 0) {
      await UpcomingEvent.findByIdAndUpdate(_id, { ...newEventParts, images: images.map(i => i.filename) });
      // After successful update, delete old event images
      for (let i = 0; i < old.images.length; i++) {
        const image = old.images[i];
        const pathToImage = path.join(__dirname, "../public/events/upcoming", image);
        if (fs.existsSync(pathToImage)) {
          fs.rmSync(pathToImage);
        }
      }
    } else {
      await UpcomingEvent.findByIdAndUpdate(_id, { ...newEventParts, images: old.images });
    }


    const newEventData = {
      images: old.images,
      location: old.location,
      postBody: old.postBody,
      postedTime: old.postedTime,
      eventTime: old.eventTime,
      rsvp: old.rsvp,
      title: old.title,
      ...newEventParts,
    }
    if (images.length > 0) {
      newEventData.images = images.map(i => i.filename);
    }

    let eventDate = new Date(parseInt(newEventData.eventTime!));

    const offSetRegex = /(-|\+)(\d{0,4})\s/g;
    const result = eventDate.toString().matchAll(offSetRegex).next().value;
    const type = result[1];
    const offset = parseInt(result[2]) / 100;

    if (type === "-") {
      eventDate = new Date(parseInt(newEventData.eventTime!) + offset * 1000 * 60 * 60);
    } else eventDate = new Date(parseInt(newEventData.eventTime!) - offset * 1000 * 60 * 60);


    const form = new FormData();

    form.append("username", "SBCC CS Club Announcements");
    form.append("avatar_url", process.env.WEBHOOK_PROFILE!);
    form.append("content", `### Event Updated\n# ${newEventData?.title}\n### [${newEventData?.location}](https://www.google.com/maps/place/${newEventData?.location?.replaceAll(/\s+/g, "+")})\n${eventDate.toLocaleString()}\n${newEventData?.postBody}`)

    for (let i = 0; i < newEventData.images.length; i++) {
      const file = newEventData.images[i];
      const pathToFile = path.join(__dirname, "../public/events/upcoming", file);
      if (fs.existsSync(pathToFile))
        form.append(`file-${i}`, fs.createReadStream(pathToFile));
    }

    form.submit(webhook!);

    res.status(200);
    return res.json({ message: "Successfully updated document" });

  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "Internal Server Error" });
  }

});

router.delete("/upcoming/:_id", minAuth, async (req, res) => {
  const { _id } = req.params;
  try {
    const form = new FormData();

    const event = await UpcomingEvent.findOne({ _id })!;
    const images = event?.images!;
    for (let i = 0; i < images.length; i++) {
      const image = images[i]!;
      const pathToImage = path.join(__dirname, "../public/events/upcoming", image!);
      if (fs.existsSync(pathToImage)) {
        fs.rmSync(pathToImage);
      }
    }
    let eventDate = new Date(event?.eventTime!);

    const offSetRegex = /(-|\+)(\d{0,4})\s/g;
    const result = eventDate.toString().matchAll(offSetRegex).next().value;
    const type = result[1];
    const offset = parseInt(result[2]) / 100;

    if (type === "-") {
      eventDate = new Date(event?.eventTime! + offset * 1000 * 60 * 60);
    } else eventDate = new Date(event?.eventTime! - offset * 1000 * 60 * 60);

    form.append("content", `### Event Deleted\n# ${event?.title}\n### [${event?.location}](https://www.google.com/maps/place/${event?.location?.replaceAll(/\s+/g, "+")})\n${eventDate.toLocaleString()}\n${event?.postBody}`);
    form.append("username", "SBCC CS Club Announcements");
    form.append("avatar_url", process.env.WEBHOOK_PROFILE!);



    await UpcomingEvent.findOneAndDelete({ _id });
    res.status(200);
    res.json({ message: "Event deleted" });
    form.submit(webhook!);
  } catch (err) {
    res.status(500);
    console.log(err);
    res.json({ message: err });
  }
});


router.post("/upcoming/rsvp/:_id", async (req, res) => {

  const { _id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400);
    return res.json({
      message: "Malformed request body",
    });
  }

  try {
    const old = await UpcomingEvent.findById(_id);
    await UpcomingEvent.findOneAndUpdate({ _id }, { rsvp: [...old?.rsvp!, name] });

    const form = new FormData();
    form.append("content", `${name} just RSVP'd to ${old?.title}!`);
    form.append("username", "SBCC CS Club Announcements");
    form.append("avatar_url", process.env.WEBHOOK_PROFILE!);

    form.submit(webhook!);

    res.status(200);
    return res.json({ message: "OK" });
  } catch (err) {
    res.status(500);
    return res.json({ message: "Internal Server Error" });
  }

});

export {
  router as Events,
};