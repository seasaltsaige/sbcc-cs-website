import { Router } from "express";
import Candidate from "../database/Models/Candidate";
import { minAuth } from "../middleware/auth";

const router = Router();

router.post("/create", minAuth, async (req, res) => {

});

router.patch("/:_id", minAuth, async (req, res) => {

});

router.delete("/:_id", minAuth, async (req, res) => {

});


export {
  router as Candidates,
}