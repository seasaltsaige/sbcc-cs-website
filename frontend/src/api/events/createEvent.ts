import axios from "axios";
import { FutureEvent } from "../../types/FutureEvent.type";
const URL = process.env.REACT_APP_URL;

export async function createEvent(event: FutureEvent, auth: string) {

  const { eventTime, image, location, postBody, title } = event;

  console.log(event, "in request");


  if (image !== null && image !== undefined) {
    return await axios.post(`${URL}/events/post`, {
      eventTime,
      image,
      location,
      postBody,
      title
    }, {
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return await axios.post(`${URL}/events/post`, {
      eventTime,
      location,
      postBody,
      title
    }, {
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
    });
  }

}