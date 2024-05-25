import { Schema, model } from "mongoose";

const Candidate = new Schema({
  name: String,
  position: {
    type: String,
    enum: [
      "President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"
    ] as const,
  },
  statement: String,
  image: String,
});

export default model("candidate", Candidate);