import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

import "./UpcomingEvents.css";

import { Navbar, FutureEventPopup, EventContainer } from "../../../components";

import { FutureEvent } from "../../../types/FutureEvent.type";

import { createEvent, getUpcomingEvents } from "../../../api/index";

export function UpcomingEvents() {
  // TODO: use cookies to check if user has rsvp'd for an event
  const cookies = new Cookies(null, { path: "/events/upcoming" });

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const [popupOpen, setPopupOpen] = useState(false);
  const [editNew, setEditNew] = useState("new" as "edit" | "new");
  const [nextEvent, setNextEvent] = useState(null as FutureEvent | null);
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
      console.log(res);
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
        // TODO: handle errors (in most of these try cases lol)
      } else {

      }
    } catch (err) {

    }
  }

  useEffect(() => {
    (async () => {
      await fetchAllFutureEvents();
      console.log(nextEvent);
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



        <p className="next-event-text">Next Event</p>
        {
          nextEvent ?
            <div className="next-event-container">
              <EventContainer
                title={nextEvent.title!}
                images={nextEvent.images}
                body={nextEvent.postBody!}
                location={nextEvent.location!}
                eventTime={nextEvent.eventTime!}
                posted={nextEvent.postedTime!}
              />
            </div>
            : <p className="no-event-upcoming">No upcoming events!</p>
        }

        <p className="future-events-text">Future Events</p>
        {
          futureEvents.length > 0 ?
            <div className="future-events-scroll">
              {
                futureEvents.map((ev) => (
                  <EventContainer
                    title={ev.title!}
                    images={ev.images}
                    body={ev.postBody!}
                    location={ev.location!}
                    eventTime={ev.eventTime!}
                    posted={ev.postedTime!}
                  />
                ))
              }
            </div>
            : <p className="no-future-events">No more events to show</p>
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