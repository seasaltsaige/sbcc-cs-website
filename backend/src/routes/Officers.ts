import jwt from "jsonwebtoken";
import passport from "passport";

import { Router } from "express";
import { minAuth } from "../middleware/auth";
import Officer from "../database/Models/Officer";

const router = Router();

router.get("/all", (req, res) => {

  res.status(200);
  res.json({
    data: "officer array"
  });

});

router.get("/:name", (req, res) => {
  const name = req.params.name;

  res.status(200);
  res.json({
    message: name,
  });


})


// Will also want file handling middleware to handle image upload
router.post("/create", minAuth, async (req, res) => {
  const { name, startDate, endDate, bio } = req.body;
  if (!name || !startDate || !bio) {
    res.status(400);
    return res.json({
      message: "Malformed request body, did you provide 'name', 'startDate', and 'bio'?",
    });
  }

  const officer = new Officer({
    name,
    startDate,
    bio,
    endDate: endDate ? endDate : null,
  });

  try {
    await officer.save();
  } catch (err) {
    res.status(500);
    return res.json({ message: "Internal server error" });
  }

});

export {
  router as Officers,
};