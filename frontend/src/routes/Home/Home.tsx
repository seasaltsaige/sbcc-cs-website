import React from "react";
import "./Home.css";
import { Navbar } from "../../components";
import { ReactComponent as LeftArrow } from "../../svgs/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../svgs/RightArrow.svg";
export function Home() {

  return (
    <>
      <Navbar />
      {/* <NavSpacer /> */}
      <div className="home-container">
        <div className="scroll-panel">
          <div className="relation">
            <p>In relation with Santa Barbara City College</p>
          </div>
          <div className="scroll-item-container">
            <LeftArrow className="arrow" />
            {/* Temporary, will have multiple items, based on like, next event and such */}
            <div className="scroll-item">
              <h1 className="scroll-item-text">Welcome to the Computer Science Club!</h1>
            </div>
            <RightArrow className="arrow" />
          </div>
        </div>
        <div className="background-image">
          <img src="/FRONT PAGE BACKGROUND.png" alt="Humanities Building" />
        </div>
      </div>
    </>
  )
}