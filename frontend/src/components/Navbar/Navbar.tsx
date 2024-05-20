import React, { useEffect, useState } from "react";
import { Squash as Menu } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import { ReactComponent as InstagramLogo } from "../../svgs/instagram.svg";

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
                <Link draggable="false" to="/officers/present">Present Officers</Link>
                <Link draggable="false" to="/officers/past">Past Officers</Link>
                <Link draggable="false" to="/events/upcoming">Upcoming Events</Link>
                <Link draggable="false" to="/events/past">Past Events</Link>
                <Link draggable="false" to="/elections">Elections</Link>
              </>
              // https://www.instagram.com/sbcccsclub/
              : <>
                <Menu color="white" toggle={setIsOpen} toggled={isOpen} rounded />
                <li className={`menu-panel ${isOpen ? "open" : "closed"}`}>
                  {/* <div className="socials">
                    <a href="https://www.instagram.com/sbcccsclub/">
                      <InstagramLogo className="instagram-logo" />
                    </a>
                  </div> */}
                  <Link onClick={() => setIsOpen(false)} draggable="false" to="/about">About Us</Link>
                  <Link onClick={() => setIsOpen(false)} draggable="false" to="/officers/present">Present Officers</Link>
                  <Link onClick={() => setIsOpen(false)} draggable="false" to="/officers/past">Past Officers</Link>
                  <Link onClick={() => setIsOpen(false)} draggable="false" to="/events/upcoming">Upcoming Events</Link>
                  <Link onClick={() => setIsOpen(false)} draggable="false" to="/events/past">Past Events</Link>
                  <Link onClick={() => setIsOpen(false)} draggable="false" to="/elections">Elections</Link>
                </li>
              </>
          }
        </div>
      </nav>
      <NavSpacer />
    </>
  )
}