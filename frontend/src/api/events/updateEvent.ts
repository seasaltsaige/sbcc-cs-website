import { axios } from "../";
import { FutureEvent } from "../../types/FutureEvent.type";


export async function updateEvent(event: FutureEvent, auth: string) {
  if (event.images.filter((i: any) => typeof i === "string").length > 0) {
    return await axios.patch(`/events/upcoming/${event._id}`, {
      newEventParts: event,
      images: null,
    }, {
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return await axios.patch(`/events/upcoming/${event._id}`, {
      newEventParts: event,
    }, {
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}