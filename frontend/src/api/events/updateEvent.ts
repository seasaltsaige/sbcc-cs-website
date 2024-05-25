import axios from "axios";
import { FutureEvent } from "../../types/FutureEvent.type";

const URL = process.env.REACT_APP_URL!;

export async function updateEvent(event: FutureEvent, auth: string) {
  return await axios.patch(`${URL}/events/upcoming/${event._id}`, {
    newEventParts: event,
  }, {
    headers: {
      Authorization: auth,
      "Content-Type": "multipart/form-data",
    },
  });
}