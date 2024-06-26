import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { Router } from "express";
import { minAuth } from "../middleware/auth";
import Officer from "../database/Models/Officer";
import multer from "multer";
import { officerStorage } from "../multer/diskStorage";
import sortOfficers, { TOfficer } from "../functions/sortOfficers";

import FormData from "form-data";

const officerUpload = multer({ storage: officerStorage });

const router = Router();

router.get("/all", async (req, res) => {
  let auth = false;
  if (req.headers["authorization"] && req.headers["authorization"].includes("Bearer")) {
    const token = jwt.verify(req.headers["authorization"].split(" ")[1], process.env.JWT_SECRET!);
    if (!token) auth = false;
    else auth = true;
  }


  const officerModels = await Officer.find();
  const officers = officerModels.map((v) => {
    return (
      {
        name: v.name,
        position: v.position,
        startDate: v.startDate,
        endDate: v.endDate,
        statement: v.statement,
        image: v.image,
        _id: auth ? v._id : null,
      }
    )
  });

  res.status(200);
  return res.json({
    officers,
  });

});

router.get("/current", async (req, res) => {

  let auth = false;
  if (req.headers["authorization"] && req.headers["authorization"].includes("Bearer")) {
    const token = jwt.verify(req.headers["authorization"].split(" ")[1], process.env.JWT_SECRET!);
    if (!token) auth = false;
    else auth = true;
  }


  const currentDate = Date.now();
  console.log(currentDate);
  const officerModels = await Officer.find();
  const officers = officerModels.map((v) => {
    return (
      {
        name: v.name,
        position: v.position,
        startDate: v.startDate,
        endDate: v.endDate,
        statement: v.statement,
        image: v.image,
        _id: auth ? v._id : null,
      }
    )
  }).filter((officer) => new Date(officer.startDate!) <= new Date(currentDate) && new Date(officer.endDate!) >= new Date(currentDate)) as TOfficer[];
  res.status(200);
  return res.json({
    officers: sortOfficers(officers),
  });


});



// Will also want file handling middleware to handle image upload
router.post("/create", minAuth, officerUpload.single("image"), async (req, res) => {
  const { name, startDate, endDate, statement, position } = req.body;
  if (!name || !startDate || !endDate || !statement || !position) {
    res.status(400);
    return res.json({
      message: "Malformed request body, did you provide 'name', 'startDate', 'endDate', 'statement', and 'position'?",
    });
  }

  const image = req.file;

  const officer = new Officer({
    name,
    startDate,
    statement,
    endDate: endDate,
    position: position,
    image: image !== undefined ? image.filename : null,
  });

  try {
    await officer.save();

    // Send webhook
    const form = new FormData();

    form.append('username', "SBCC CS Club Announcements");
    form.append('avatar_url', process.env.WEBHOOK_PROFILE!);
    if (image)
      form.append('file', fs.createReadStream(image.path));
    form.append('content', `# New Officer Was Created\n\n**Name**: ${name}\n**Term Start**: ${new Date(parseInt(startDate)).toLocaleDateString()}\n**Term End**: ${new Date(parseInt(endDate)).toLocaleDateString()}\n**Officer Statement**: ${statement}\n**Position**: ${position}`);

    form.submit(process.env.DISCORD_WEBHOOK!);

    res.status(200);
    return res.json({ message: `Successfully created officer: ${name}` });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "Internal server error" });
  }

});

// Delete a specific officer
router.delete("/:_id", minAuth, async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    res.status(400);
    return res.json({ message: "Malformed parameter, no _id provided" });
  }
  try {
    const officer = await Officer.findOne({ _id });
    if (officer?.image !== null) {
      const pathToImage = path.join(__dirname, "../public/officers", officer?.image!);

      if (fs.existsSync(pathToImage)) {
        fs.rmSync(pathToImage);
      }
    }

    await Officer.findByIdAndDelete(_id);

    res.status(200);
    return res.json({ message: "Successfully deleted officer" });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "Internal server error" });
  }

});


router.patch("/:_id", minAuth, officerUpload.single("image"), async (req, res) => {
  const _id = req.params["_id"];

  if (!_id) {
    res.status(400);
    return res.json({ message: "Malformed parameter, no _id provided" });
  }
  const { name, startDate, endDate, statement, position } = req.body;
  if (!name || !startDate || !endDate || !statement || !position) {
    res.status(400);
    return res.json({
      message: "Malformed request body, did you provide 'name', 'startDate', 'endDate', 'statement', and 'position'?",
    });
  }
  const image = req.file;

  try {
    const oldOfficer = await Officer.findOne({ _id });
    if (image !== undefined) {
      // New image was provided
      const pathToOldImage = path.join(__dirname, "../public/officers", oldOfficer?.image!);
      fs.rmSync(pathToOldImage);
    }
    const update: any = {
      name,
      startDate: startDate,
      endDate: endDate,
      statement,
      position,
    };
    if (image !== undefined)
      update.image = image.filename;

    await Officer.findOneAndUpdate({ _id }, { ...update });

    res.status(200);
    return res.json({ message: "Successfully updated officer" });
    // Need to remove old image if a new image was provided.
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "Internal server error" });
  }

});

export {
  router as Officers,
};