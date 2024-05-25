import { Schema, model } from "mongoose";

// A poll that organizes a vote
// will contain references to all the candidates associated with the poll
const VotingPoll = new Schema({

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
  projectmanager: [
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
  tresurers: [
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
    start: Date,
    end: Date,
  },
  postedOn: Date,
});

export default model("votingpoll", VotingPoll);