import { Schema, model } from "mongoose";

// A poll that organizes a vote
// will contain references to all the candidates associated with the poll
const ElectionPoll = new Schema({

  presidents: [
    {
      votes: { type: Number },
      candidate: { type: Schema.Types.ObjectId }
    }
  ],
  vicepresidents: [
    {
      votes: { type: Number },
      candidate: { type: Schema.Types.ObjectId }
    }
  ],
  projectmanagers: [
    {
      votes: { type: Number },
      candidate: { type: Schema.Types.ObjectId }
    }
  ],
  secretarys: [
    {
      votes: { type: Number },
      candidate: { type: Schema.Types.ObjectId }
    }
  ],
  treasurers: [
    {
      votes: { type: Number },
      candidate: { type: Schema.Types.ObjectId }
    }
  ],
  promoters: [
    {
      votes: { type: Number },
      candidate: { type: Schema.Types.ObjectId }
    }
  ],

  // Range of times to vote for polling
  voteTime: {
    start: Number,
    end: Number,
  },
  postedOn: Number,
});

export default model("electionpoll", ElectionPoll);