import { Router } from "express";
import { minAuth } from "../middleware/auth";

import ElectionPoll from "../database/Models/ElectionPoll";
import { Types } from "mongoose";

const router = Router();


router.post("/vote", async (req, res) => {

});

router.get("/", async (req, res) => {
  try {
    const elections = await ElectionPoll.find();
    if (elections.length === 0) {
      res.status(404);
      return res.json({ message: "No Election Polls exist." });
    }

    const election = elections[0];

    res.status(200);
    return res.json({
      message: "OK",
      election: {
        postedOn: election.postedOn,
        presidents: election.presidents,
        vicepresidents: election.vicepresidents,
        projectmanagers: election.projectmanagers,
        secretarys: election.secretarys,
        treasurers: election.treasurers,
        promoters: election.promoters,
        voteTime: election.voteTime,
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "Internal Server Error" });
  }
});

router.post("/create", minAuth, async (req, res) => {
  // Will only allow one election to be created at a time, since this will only be used for voting for officers, only one needs to exist at a time

  const {
    presidents,
    vicepresidents,
    projectmanagers,
    secretarys,
    treasurers,
    promoters,
    startTime,
    endTime,
  } = req.body;

  if (
    (!presidents || !Array.isArray(presidents) || presidents.length < 1) ||
    (!vicepresidents || !Array.isArray(vicepresidents) || vicepresidents.length < 1) ||
    (!projectmanagers || !Array.isArray(projectmanagers) || projectmanagers.length < 1) ||
    (!secretarys || !Array.isArray(secretarys) || secretarys.length < 1) ||
    (!treasurers || !Array.isArray(treasurers) || treasurers.length < 1) ||
    (!promoters || !Array.isArray(promoters) || promoters.length < 1) ||
    !startTime ||
    !endTime ||
    isNaN(parseInt(startTime)) ||
    isNaN(parseInt(endTime))
  ) {
    res.status(400);
    return res.json({ message: "Malformed request body, did you include 'presidents', 'vicepresidents', 'projectmanagers', 'secretarys', 'treasurers', 'promoters', 'startTime', and 'endTime'?" });
  }

  try {

    const eventExists = await ElectionPoll.find();
    if (eventExists.length > 0) {
      res.status(401);
      return res.json({ message: "Action not allowed. Election already exists." });
    }

    const election = new ElectionPoll({
      postedOn: Date.now(),
      presidents: presidents.map((_id: Types.ObjectId) => ({ votes: 0, candidate: _id })),
      vicepresidents: vicepresidents.map((_id: Types.ObjectId) => ({ votes: 0, candidate: _id })),
      projectmanagers: projectmanagers.map((_id: Types.ObjectId) => ({ votes: 0, candidate: _id })),
      secretarys: secretarys.map((_id: Types.ObjectId) => ({ votes: 0, candidate: _id })),
      treasurers: treasurers.map((_id: Types.ObjectId) => ({ votes: 0, candidate: _id })),
      promoters: promoters.map((_id: Types.ObjectId) => ({ votes: 0, candidate: _id })),
      voteTime: {
        start: parseInt(startTime),
        end: parseInt(endTime),
      },
    });

    await election.save();

    res.status(200);
    return res.json({ message: "Successfully created election" });

  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "Internal Server Error" });
  }


});

router.patch("/:_id", minAuth, async (req, res) => {

});

router.delete("/:_id", minAuth, async (req, res) => {

});


export {
  router as Elections,
}