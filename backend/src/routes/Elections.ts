import { Router } from "express";
import { minAuth } from "../middleware/auth";

const router = Router();

// Route used to post a vote for a given candidate
router.post("/vote", async (req, res) => {

});

// Gets all potential candidates for next election
router.get("/all", async (req, res) => {

});

// Creates a new candidate in the system, will show up on the main elections page
// Will also want image
router.post("/create", minAuth, async (req, res) => {

});

// Deletes a specific candidate from the running
// _id will only show up if logged in, and will be used in the request to delete
// (delete button)
router.delete("/:_id", minAuth, async (req, res) => {

});


export {
  router as Elections,
}