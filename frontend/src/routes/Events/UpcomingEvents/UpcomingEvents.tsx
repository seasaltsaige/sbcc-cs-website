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

  function saveEvent() {

  }


  return (
    <>
      <Navbar />
      <div className="upcoming-events-container">
        {
          isAuth() ?
            <button
              className="admin-create-event">
              Create Event
            </button>
            : <></>
        }


        Upcoming Events Page

      </div>

      <FutureEventPopup
        open={popupOpen}
        saveEvent={saveEvent}
        event={null}
      />

    </>
  )
}