import { Schema, model } from "mongoose";

const Event = new Schema({
  // Array of image names in post
  images: [String]!,
  // Markdown post body, up to 2000 characters
  postBody: String,
  // Date timestamp for post time
  postedDate: Number,
  // Event timestamp for when event will take place
  eventDate: Number,
  title: String,
});

export default model("event", Event);