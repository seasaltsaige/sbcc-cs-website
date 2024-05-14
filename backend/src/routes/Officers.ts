import jwt from "jsonwebtoken";

import { Router } from "express";
import { minAuth } from "../middleware/auth";
import Officer from "../database/Models/Officer";
import multer from "multer";
import { officerStorage } from "../multer/diskStorage";
import sortOfficers, { TOfficer } from "../functions/sortOfficers";

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
  }).filter((officer) => officer.startDate! <= currentDate && officer.endDate! >= currentDate) as TOfficer[];
  // TODO: sort officers in correct orders
  // President, Vice President, Project Manager, Secretary, Tresurer, Promoter

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
  console.log(image);

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
  const _id = req.params["_id"];
  if (!_id) {
    res.status(400);
    return res.json({ message: "Malformed parameter, no _id provided" });
  }
  try {
    await Officer.findOneAndDelete({ _id });

    res.status(200);
    return res.json({ message: "Successfully deleted officer" });
  } catch (err) {
    res.status(500);
    return res.json({ message: "Internal server error" });
  }

});

export {
  router as Officers,
};