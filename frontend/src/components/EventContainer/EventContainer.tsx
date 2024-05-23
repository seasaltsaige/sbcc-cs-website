import React from "react";

import "./EventContainer.css";

const url = process.env.REACT_APP_URL!;

export function EventContainer({
  title,
  images,
  body,
  location,
  eventTime,
  posted,
  // rsvp,
  // edit - only for officers
  // delete - only for officers
}: {
  title: string;
  images: string[];
  body: string;
  location: string;
  eventTime: number;
  posted: number
}) {





  return (
    <div className="event-container">
      <p className="event-title">{title}</p>
      <p className="event-time">{`${new Date(eventTime).toDateString()} @ ${new Date(eventTime + 7000 * 60 * 60).toLocaleTimeString()}`}</p>
      <a target="_blank" className="event-location" href={`https://www.google.com/maps/place/${location.replaceAll(/\s+/g, "+")}`}>{`${location}`} &#x1F5D7;</a>

      <div className="event-images-container">
        {
          images.map(image =>
            <img className="event-image" src={`${url}/uploads/events/upcoming/${image}`} alt={`${title.toLowerCase().replaceAll(/\s+/g, "_")}_image`} />
          )
        }
      </div>
      <p className="event-body">{body}</p>

      <p className="event-posted-time">{`${new Date(posted).toDateString()} at ${new Date(posted + 7000 * 60 * 60).toLocaleTimeString()}`}</p>
    </div>
  )
}