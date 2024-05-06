import { Schema, model } from "mongoose";

// A poll that organizes a vote
// will contain references to all the candidates associated with the poll
const VotingPoll = new Schema({

});

export default model("votingpoll", VotingPoll);