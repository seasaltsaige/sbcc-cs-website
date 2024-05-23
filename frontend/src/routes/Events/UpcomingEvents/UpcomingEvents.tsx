import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

import "./UpcomingEvents.css";

import { Navbar, FutureEventPopup } from "../../../components";

import { FutureEvent } from "../../../types/FutureEvent.type";

import { createEvent, getUpcomingEvents } from "../../../api/index";

// import { createEvent } from "../../../api/events/createEvent";
// import { getUpcomingEvents } from "../../../api/events/getUpcomingEvents";

export function UpcomingEvents() {
  // TODO: use cookies to check if user has rsvp'd for an event
  const cookies = new Cookies(null, { path: "/events/upcoming" });

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const [popupOpen, setPopupOpen] = useState(false);
  const [editNew, setEditNew] = useState("new" as "edit" | "new");
  const [nextEvent, setNextEvent] = useState({} as FutureEvent | null);
  const [futureEvents, setFutureEvents] = useState([] as Array<FutureEvent>);

  // const [set]
  const open = () => {
    setPopupOpen(true);
  }

  const close = () => {
    setPopupOpen(false);
  }


  async function fetchAllFutureEvents() {
    try {
      const res = await getUpcomingEvents();
      if (res.status === 200) {
        const next = (res.data.events as FutureEvent[]).splice(0, 1)[0];
        setNextEvent(next);
        setFutureEvents(res.data.events);
      }
    } catch (err) {

    }
  }

  async function saveEvent(event: FutureEvent, type: "edit" | "new") {
    const auth = authHeader();
    console.log(event)
    try {
      if (type === "new") {
        const res = await createEvent(event, auth);
        if (res.status === 200) {
          await fetchAllFutureEvents();
        }
      } else {

      }
    } catch (err) {

    }
  }

  useEffect(() => {
    (async () => {
      await fetchAllFutureEvents();
    })();
  }, []);


  return (
    <>
      <Navbar />
      <div className="upcoming-events-container">
        {
          isAuth() ?
            <button
              className="admin-create-event"
              onClick={() => { setEditNew("new"); open(); }}
            >
              Create Event
            </button>
            : <></>
        }



        <h1>Next Event</h1>
        {
          nextEvent ?
            <div>
              <p>{nextEvent.title}</p>
              <img src={`${process.env.REACT_APP_URL}/uploads/events/upcoming/${nextEvent.image}` || "https://placehold.co/400"} />
              <p>{nextEvent.postBody}</p>
              <a href={`https://www.google.com/maps/place/${nextEvent.location?.replaceAll(/\s+/g, "+")}`}>{nextEvent.location}</a>
              <p>{new Date(nextEvent.eventTime!).toString()}</p>
              <p>{new Date(nextEvent.postedTime!).toString()}</p>
            </div>
            : <p>No next event</p>
        }

        <h1>Future Events</h1>
        {
          futureEvents.length > 0 ?
            <div>
              {
                futureEvents.map((ev) => (
                  <div>
                    <p>{ev.title}</p>
                    <img src={`${process.env.REACT_APP_URL}/uploads/events/upcoming/${ev.image}` || "https://placehold.co/400"} />
                    <p>{ev.postBody}</p>
                    <a href={`https://www.google.com/maps/place/${ev.location?.replaceAll(/\s+/g, "+")}`}>{ev.location}</a>
                    <p>{new Date(ev.eventTime!).toString()}</p>
                    <p>{new Date(ev.postedTime!).toString()}</p>
                  </div>
                ))
              }
            </div>
            : <p>No more events to display</p>
        }
      </div>

      <FutureEventPopup
        type={editNew}
        open={popupOpen}
        close={close}
        saveEvent={saveEvent}
        eventObject={null}
      />

    </>
  )
}