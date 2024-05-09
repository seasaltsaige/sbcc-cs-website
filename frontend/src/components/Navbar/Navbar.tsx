import React from "react";
// import ClubLogo from "/SBCC_CSCLUB_LOGO_TRANSPARENT.png";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

export default function () {

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="club-logo" onClick={() => navigate("/")}>
        <img className="club-logo-image" src="/SBCC_CSCLUB_LOGO_TRANSPARENT.png" alt="Club Logo" />
        <p className="club-logo-text">SBCC Computer Science Club</p>

      </div>
      <div className="navbar-links">

        <Link to="/about">About Us</Link>

        {/* Drop Down link with officers, Present Past */}
        <Link to="/officers/present">Present Officers</Link>
        <Link to="/officers/past">Past Officers</Link>

        {/* Drop Down link with events, Upcoming, Past */}
        <Link to="/events/upcoming">Upcoming Events</Link>
        <Link to="/events/past">Past Events</Link>


        <Link to="/elections">Elections</Link>
        {/* <Link to="/about">About Us</Link> */}
        {/* <Link to="/about">About Us</Link> */}
      </div>
    </nav>
  )
}