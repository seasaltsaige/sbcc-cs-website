export type FutureEvent = {
  // backend image name
  images?: any;
  // address
  location?: string | undefined;
  // Text for post
  postBody?: string | undefined;
  // Time posted at
  postedTime?: number | undefined;
  // Time event is at
  eventTime?: number | undefined;
  // List of names rsvp'd
  rsvp?: Array<string>;
  // Title of event
  title?: string;
  _id?: string | null;
}