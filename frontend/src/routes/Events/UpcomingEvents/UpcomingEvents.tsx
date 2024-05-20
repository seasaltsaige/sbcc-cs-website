import React, { useState } from "react";
import Cookies from "universal-cookie";

import "./UpcomingEvents.css";
import Navbar from "../../../components/Navbar/Navbar";
import { useIsAuthenticated } from "react-auth-kit";
import FutureEventPopup from "../../../components/FutureEvent/FutureEventPopup";

export function UpcomingEvents() {

  const cookies = new Cookies(null, { path: "/events/upcoming" });

  const isAuth = useIsAuthenticated();

  const [popupOpen, setPopupOpen] = useState(false);
  // const [set]
  const open = () => {
    setPopupOpen(true);
  }

  const close = () => {

    setPopupOpen(false);
  }

  function saveEvent() {

  }


  return (
    <>
      <Navbar />
      <div className="upcoming-events-container">
        {
          isAuth() ?
            <button
              className="admin-create-event"
              onClick={() => open()}
            >
              Create Event
            </button>
            : <></>
        }


        Upcoming Events Page

      </div>

      <FutureEventPopup
        type="new"
        open={popupOpen}
        close={close}
        saveEvent={saveEvent}
        eventObject={null}
      />

    </>
  )
}