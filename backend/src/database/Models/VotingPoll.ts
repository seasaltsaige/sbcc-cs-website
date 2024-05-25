import { Schema, model } from "mongoose";

// A poll that organizes a vote
// will contain references to all the candidates associated with the poll
const VotingPoll = new Schema({

  presidents: [Schema.Types.ObjectId],
  vicepresidents: [Schema.Types.ObjectId],
  projectmanager: [Schema.Types.ObjectId],
  secretarys: [Schema.Types.ObjectId],
  tresurers: [Schema.Types.ObjectId],
  promoters: [Schema.Types.ObjectId],

  // Range of times to vote for polling
  voteTime: {
    start: Date,
    end: Date,
  },
  postedOn: Date,
});

export default model("votingpoll", VotingPoll);