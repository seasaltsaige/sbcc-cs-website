export type FutureEvent = {
  // backend image name
  image: string;
  // address
  location: string;
  // Text for post
  postBody: String;
  // Time posted at
  postedTime: Number;
  // Time event is at
  eventTime: Number;
  // List of names rsvp'd
  rsvp: Array<string>;
  // Title of event
  title: string;
  _id: string | null;
}