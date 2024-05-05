import { Schema, model } from "mongoose";

const Officer = new Schema({
  name: String,
  startDate: Number,
  endDate: Number!,
  bio: String,
  image: String!
});

export default model("officer", Officer);