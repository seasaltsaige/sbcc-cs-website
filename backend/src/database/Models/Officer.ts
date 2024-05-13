import { Schema, model } from "mongoose";

const Officer = new Schema({
  name: String,
  position: {
    type: String,
    enum: [
      "President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"
    ] as const,
  },
  startDate: Number,
  endDate: Number,
  statement: String,
  image: String,
});

export default model("officer", Officer);