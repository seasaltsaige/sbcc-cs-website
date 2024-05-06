import { Schema, model } from "mongoose";

// A poll that organizes a vote
// will contain references to all the candidates associated with the poll
const VotingPoll = new Schema({
  candidates: [Schema.Types.ObjectId],
  // Range of times to vote for polling
  voteTime: {
    start: Date,
    end: Date,
  },
  postedOn: Date,
});

export default model("votingpoll", VotingPoll);