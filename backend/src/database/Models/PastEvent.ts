import { Schema, model } from "mongoose";

// Once event date passes, will be updated to be a past event.
// Initially might need to be in a pending state, allowing for officers to post event photos
// update description of event to reflect it passing, etc
const PastEvent = new Schema({

});

export default model("pastevent", PastEvent);