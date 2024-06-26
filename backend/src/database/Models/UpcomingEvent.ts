import { Schema, model } from "mongoose";

const UpcomingEvent = new Schema({
  // Array of image names in post
  images: [{ type: String }],
  location: String,
  // Markdown post body, up to 2000 characters
  postBody: String,
  // Date timestamp for post time
  postedTime: Number,
  // Event timestamp for when event will take place
  eventTime: Number,
  // Array of peoples names that rsvp'd
  rsvp: [{ type: String }],
  title: String,
});

export default model("upcomingevent", UpcomingEvent);