import { Schema, model } from "mongoose";

const Officer = new Schema({
  name: String,
  position: {
    type: String,
    enum: [
      "Club President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"
    ] as const,
  },
  startDate: Date,
  endDate: Date!,
  statement: String,
  image: String!
});

export default model("officer", Officer);