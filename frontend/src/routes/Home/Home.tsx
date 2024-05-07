import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";

export function Home() {

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="scroll-panel">
          <div className="relation">
            <p>In relation with Santa Barbara City College</p>
          </div>
          <div className="scroll-item-container">
            <div className="scroll-item">

            </div>
          </div>
        </div>
        <div className="background-image">
          <img src="/FRONT PAGE BACKGROUND.png" alt="Humanities Building" />
        </div>
      </div>
    </>
  )
}