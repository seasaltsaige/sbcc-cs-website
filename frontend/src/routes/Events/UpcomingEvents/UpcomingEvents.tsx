import React, { useState } from "react";
import Cookies from "universal-cookie";

import "./UpcomingEvents.css";
import Navbar from "../../../components/Navbar/Navbar";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import FutureEventPopup from "../../../components/FutureEvent/FutureEventPopup";
import { FutureEvent } from "../../../types/FutureEvent.type";
import { createEvent } from "../../../api/events/createEvent";

export function UpcomingEvents() {

  const cookies = new Cookies(null, { path: "/events/upcoming" });

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const [popupOpen, setPopupOpen] = useState(false);
  const [editNew, setEditNew] = useState("new" as "edit" | "new");

  // const [set]
  const open = () => {
    setPopupOpen(true);
  }

  const close = () => {

    setPopupOpen(false);
  }

  async function saveEvent(event: FutureEvent, type: "edit" | "new") {
    const auth = authHeader();
    console.log(event)
    try {
      if (type === "new") {
        const res = await createEvent(event, auth);
        if (res.status === 200) {

        }
      } else {

      }
    } catch (err) {

    }
  }


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


        Upcoming Events Page

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