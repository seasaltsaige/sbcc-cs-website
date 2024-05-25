import React, { useState } from "react";

import "./RSVPPopup.css";

export function RSVPPopup({
  // for: for_event,
  setRSVPName,
  visible,
  submit,
  close,
}: {
  // for: string;
  setRSVPName: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
  submit: () => void;
  close: () => void;
}) {

  return (
    visible ?
      <div className="popup-rsvp-input">
        <p className="rsvp-name-text">Whats your name?</p>
        <input className="rsvp-name-input" type="text" onChange={(ev) => setRSVPName(ev.target.value)} />
        <div className="rsvp-buttons">
          <button className="rsvp-popup-button" onClick={() => submit()}>I'm going!</button>
          <button className="rsvp-popup-button" onClick={() => close()}>Never mind</button>
        </div>
      </div>
      : <></>
  )

}