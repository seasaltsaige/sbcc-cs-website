import React, { useEffect, useState } from "react";
import "./EventContainer.css";
import { useIsAuthenticated } from "react-auth-kit";
import { ReactComponent as NewTabIcon } from "../../svgs/newtab.svg";
import { RSVPPopup } from "../";
import { rsvpToEvent } from "../../api";

const url = process.env.REACT_APP_URL!;

export function EventContainer({
  title,
  images,
  body,
  location,
  eventTime,
  posted,
  rsvpCount,
  _id,
  rsvp,
  hasRSVP,
  edit,
  deleteEv
}: {
  title: string;
  images: string[];
  body: string;
  location: string;
  eventTime: number;
  posted: number;
  rsvpCount: number;
  _id: string;
  rsvp: (_id: string) => Promise<void>;
  hasRSVP: (_id: string) => boolean;
  edit: () => void;
  deleteEv: (_id: string) => Promise<void>;
}) {


  const isAuth = useIsAuthenticated();
  const [alreadyRsvp, setAlreadyRsvp] = useState(false);
  const [rsvpName, setRSVPName] = useState("");

  const [rsvpPopupVisible, setRsvpVisible] = useState(false);

  const rsvpd = () => {
    const val = hasRSVP(_id);
    setAlreadyRsvp(val);
  }

  const rsvpEvent = async (_id: string) => {
    if (rsvpName === "") return;
    try {
      await rsvpToEvent(_id, rsvpName);
      rsvp(_id);
      rsvpd();
      closePopup();
    } catch (err) {
      console.log(err);
    }
  }

  const closePopup = () => {
    setRSVPName("");
    setRsvpVisible(false);
  }

  useEffect(() => {
    rsvpd();
  }, []);


  return (
    <div className="event-container">
      <p className="event-title">{title}</p>
      <p className="event-time">{`${new Date(eventTime).toDateString()} @ ${new Date(eventTime + 7000 * 60 * 60).toLocaleTimeString()}`}</p>
      <div className="event-location-container">
        <p>{location}</p>
        <a target="_blank" href={`https://www.google.com/maps/place/${location.replaceAll(/\s+/g, "+")}`}>Get Directions ↗</a>
      </div>
      <div className="event-images-container">
        {
          images.length > 0 ?
            images.map(image =>
              <img className="event-image" src={`${url}/uploads/events/upcoming/${image}`} alt={`${title.toLowerCase().replaceAll(/\s+/g, "_")}_image`} />
            )
            : "https://placehold.co/400"
        }
      </div>
      <div className="event-body-text">
        <p>{body}</p>
      </div>
      <p className="event-posted-time">Posted on {`${new Date(posted).toDateString()} at ${new Date(posted).toLocaleTimeString()}`}<br /><i>{rsvpCount} {rsvpCount > 1 ? "people are" : "person is"} going!</i></p>

      <div className="event-buttons">
        {/* For right now, just rsvp's, but will want to add name input beforehand */}
        <button disabled={alreadyRsvp} onClick={() => { setRsvpVisible(!rsvpPopupVisible); }} className="rsvp-button">RSVP</button>
        <RSVPPopup
          setRSVPName={setRSVPName}
          visible={rsvpPopupVisible}
          close={() => closePopup()}
          submit={() => rsvpEvent(_id)}
        />

        {
          isAuth()
            ? <>
              <button onClick={() => edit()} className="event-admin-button">Edit</button>
              <button onClick={() => deleteEv(_id)} className="event-admin-button">Delete</button>
            </>
            : <></>
        }
      </div>
    </div>
  )
}