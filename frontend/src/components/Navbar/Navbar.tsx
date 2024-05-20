import React, { useEffect, useState } from "react";
import { Squash as Menu } from "hamburger-react";
// import ClubLogo from "/SBCC_CSCLUB_LOGO_TRANSPARENT.png";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";
function NavSpacer() {
  return (
    <div className="nav-spacer"></div>
  )
}

export default function () {

  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {

  // }, [isOpen, width]);

  // console.log(width)
  return (
    <>
      <nav className="navbar">
        <div className="club-logo" onClick={() => navigate("/")}>
          <img className="club-logo-image" src="/SBCC_CSCLUB_LOGO_TRANSPARENT.png" alt="Club Logo" />
          <p className="club-logo-text">{width > 1200 ? "SBCC Computer Science Club" : "SBCC CS Club"}</p>

        </div>
        <div className="navbar-links">
          {
            width > 950 ?
              <>
                <Link draggable="false" to="/about">About Us</Link>
                {/* Drop Down link with officers, Present Past */}
                <Link draggable="false" to="/officers/present">Present Officers</Link>
                <Link draggable="false" to="/officers/past">Past Officers</Link>
                {/* Drop Down link with events, Upcoming, Past */}
                <Link draggable="false" to="/events/upcoming">Upcoming Events</Link>
                <Link draggable="false" to="/events/past">Past Events</Link>
                <Link draggable="false" to="/elections">Elections</Link>
                {/* <Link to="/about">About Us</Link> */}
                {/* <Link to="/about">About Us</Link> */}
              </>
              : <>
                <Menu color="white" toggle={setIsOpen} toggled={isOpen} rounded />
                <div className={`menu-panel ${isOpen ? "open" : "closed"}`}>
                  <Link draggable="false" to="/about">About Us</Link>
                  {/* Drop Down link with officers, Present Past */}
                  <Link draggable="false" to="/officers/present">Present Officers</Link>
                  <Link draggable="false" to="/officers/past">Past Officers</Link>
                  {/* Drop Down link with events, Upcoming, Past */}
                  <Link draggable="false" to="/events/upcoming">Upcoming Events</Link>
                  <Link draggable="false" to="/events/past">Past Events</Link>
                  <Link draggable="false" to="/elections">Elections</Link>
                </div>
              </>
            // : (<Hamburger></Hamburger>)
          }
        </div>
      </nav>
      <NavSpacer />
    </>
  )
}