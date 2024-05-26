import { Router } from "express";
import multer from "multer";
import FormData from "form-data";
import path from "path";
import fs from "fs";

import Candidate from "../database/Models/Candidate";
import { candiateStorage } from "../multer/diskStorage";
import { minAuth } from "../middleware/auth";


const candidateUpload = multer({ storage: candiateStorage });

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK!;
const WEBHOOK_PROFILE_URL = process.env.WEBHOOK_PROFILE!;

const router = Router();

router.get("/all", async (req, res) => {
  try {
    const allCandidates = await Candidate.find();
    res.status(200);
    return res.json({
      message: "OK",
      candidates: allCandidates.map(cand => ({
        name: cand.name,
        position: cand.position,
        statement: cand.statement,
        image: cand.image,
      })),
    });
  } catch (err) {
    res.status(500);
    return res.json({ message: "Internal Server Error" });
  }

});

router.post("/create", minAuth, candidateUpload.single("image"), async (req, res) => {

  const { name, position, statement } = req.body;
  const image = req.file;

  if (!name || !position || !statement) {
    res.status(400);
    return res.json({ message: "Malformed request body. Did you include 'name', 'position', and 'statement'?" });
  }

  try {

    const candidate = new Candidate({
      image: image ? image.filename : null,
      name,
      position,
      statement
    });

    await candidate.save();

    const form = new FormData();
    form.append('username', "SBCC CS Club Announcements");
    form.append('avatar_url', process.env.WEBHOOK_PROFILE!);
    form.append("content", `### New Officer Candidate Created\n# Name: ${name}\nPosition: ${position}\nStatement: ${statement}`);
    if (image) {
      const pathToFile = path.join(__dirname, "../public/candidates", image.filename);
      if (fs.existsSync(pathToFile)) {
        form.append("file", fs.createReadStream(pathToFile));
      }
    }

    form.submit(WEBHOOK_URL);

    res.status(200);
    return res.json({ message: "OK" });

  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "Internal Server Error" });
  }

});

router.patch("/:_id", minAuth, candidateUpload.single("image"), async (req, res) => {

});

router.delete("/:_id", minAuth, async (req, res) => {

});


export {
  router as Candidates,
}