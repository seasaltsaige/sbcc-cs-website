import React, { useEffect, useState } from "react";
import "./EventContainer.css";
import { useIsAuthenticated } from "react-auth-kit";
import { RSVPPopup } from "../";
import { rsvpToEvent } from "../../api";
import { FutureEvent } from "../../types/FutureEvent.type";

const url = process.env.REACT_APP_URL!;

export function EventContainer({
  event,
  rsvp,
  hasRSVP,
  edit,
  deleteEv
}: {
  event: FutureEvent;
  rsvp: (_id: string) => Promise<void>;
  hasRSVP: (_id: string) => boolean;
  edit: () => void;
  deleteEv: (_id: string) => Promise<void>;
}) {

  const [eventObject, setEventObject] = useState({} as FutureEvent);

  // const { _id, eventTime, images, location, postBody: body, postedTime: posted, rsvp: rsvpArr, title } = event;


  const isAuth = useIsAuthenticated();
  const [alreadyRsvp, setAlreadyRsvp] = useState(false);
  const [rsvpName, setRSVPName] = useState("");

  const [rsvpPopupVisible, setRsvpVisible] = useState(false);

  const rsvpd = () => {
    const val = hasRSVP(eventObject?._id!);
    console.log(val, "rsvp");
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
  });

  useEffect(() => {
    setEventObject(event);
  }, [event]);


  return (
    <div className="event-container">
      <p className="event-title">{eventObject.title}</p>
      <p className="event-time">{`${new Date(eventObject.eventTime!).toDateString()} @ ${new Date(eventObject.eventTime! + 7000 * 60 * 60).toLocaleTimeString()}`}</p>
      <div className="event-location-container">
        <p>{eventObject.location}</p>
        <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/place/${eventObject.location?.replaceAll(/\s+/g, "+")}`}>Get Directions ↗</a>
      </div>
      <div className="event-images-container">
        {
          eventObject && eventObject.images && eventObject.images.length > 0 ?
            eventObject.images.map((evImage: any) =>
              <img className="event-image" src={`${url}/uploads/events/upcoming/${evImage}`} alt={`${eventObject.title?.toLowerCase().replaceAll(/\s+/g, "_")}_image`} />
            )
            : "https://placehold.co/400"
        }
      </div>
      <div className="event-body-text">
        <p>{eventObject.postBody!}</p>
      </div>
      <p className="event-posted-time">Posted on {`${new Date(eventObject.postedTime!).toDateString()} at ${new Date(eventObject.postedTime!).toLocaleTimeString()}`}<br /><i>{eventObject.rsvp?.length || ""} {eventObject.rsvp?.length === 0 ? "No one has rsvp'd yet..." : `${eventObject.rsvp?.length! > 1 ? "people are" : "person is"} going! `}</i></p>

      <div className="event-buttons">
        <button disabled={alreadyRsvp} onClick={() => { setRsvpVisible(!rsvpPopupVisible); }} className="rsvp-button">RSVP</button>
        <RSVPPopup
          setRSVPName={setRSVPName}
          visible={rsvpPopupVisible}
          close={() => closePopup()}
          submit={() => alreadyRsvp ? "" : rsvpEvent(eventObject._id!)}
        />

        {
          isAuth()
            ? <>
              <button onClick={() => edit()} className="event-admin-button">Edit</button>
              <button onClick={() => deleteEv(eventObject._id!)} className="event-admin-button">Delete</button>
            </>
            : <></>
        }
      </div>
    </div>
  )
}