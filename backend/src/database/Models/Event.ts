import { Schema, model } from "mongoose";

const Event = new Schema({
  // Array of image names in post
  images: String,
  // Markdown post body, up to 2000 characters
  postBody: String,
  // Date timestamp for post time
  postedDate: Number,
  // Event timestamp for when event will take place
  eventDate: Number,
  // Array of rsvp'd ips. Potentially dangerous, but also not really sure how else to handle this. Preventing spam and such, maybe client side, but yeah
  rsvp: [String],
  title: String,
});

export default model("event", Event);