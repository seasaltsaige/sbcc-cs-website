import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

import "./UpcomingEvents.css";

import { Navbar, FutureEventPopup, EventContainer } from "../../../components";

import { FutureEvent } from "../../../types/FutureEvent.type";

import { createEvent, deleteEvent, getUpcomingEvents, updateEvent } from "../../../api/index";

export function UpcomingEvents() {
  // TODO: use cookies to check if user has rsvp'd for an event
  const cookies = new Cookies(null);

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const [popupOpen, setPopupOpen] = useState(false);
  const [editNew, setEditNew] = useState("new" as "edit" | "new");
  const [eventObject, setEventObject] = useState(null as FutureEvent | null);

  const [nextEvent, setNextEvent] = useState(null as FutureEvent | null);
  const [futureEvents, setFutureEvents] = useState([] as Array<FutureEvent>);

  const open = () => {
    setPopupOpen(true);
  }

  const close = () => {
    setEventObject(null);
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
        const res = await updateEvent(event, auth);
        if (res.status === 200) {
          await fetchAllFutureEvents();
        }
      }
    } catch (err) {

    }
  }


  const rsvp = async (_id: string) => {
    cookies.set(`rsvp_${_id}`, true);
    await fetchAllFutureEvents();
  }
  const checkRsvp = (_id: string) => {
    const found = cookies.get(`rsvp_${_id}`);
    if (found) return true;
    else return false;
  }

  const delEvent = async (_id: string) => {
    const auth = authHeader();
    if (isAuth()) {
      try {
        await deleteEvent(_id, auth);
      } catch (err) {
        console.log(err);
      }
    }
    await fetchAllFutureEvents();
  }

  const editEvent = (event: FutureEvent) => {
    setEditNew("edit");
    setEventObject(event);
    setPopupOpen(true);
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



        <p className="next-event-text">Next Event</p>
        {
          nextEvent ?
            <div className="next-event-container">
              <EventContainer
                event={nextEvent}
                rsvp={rsvp}
                hasRSVP={checkRsvp}
                deleteEv={delEvent}
                edit={() => editEvent(nextEvent)}
              />
            </div>
            : <p className="no-event-upcoming">No upcoming events!</p>
        }

        <p className="future-events-text">Future Events</p>
        {
          futureEvents.length > 0 ?
            <div className="future-events-scroll">
              {
                futureEvents.map((ev, i) => (
                  <EventContainer
                    key={i}
                    event={ev}
                    rsvp={rsvp}
                    hasRSVP={checkRsvp}
                    deleteEv={delEvent}
                    edit={() => editEvent(ev)}
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
        eventObject={eventObject}
      />

    </>
  )
}