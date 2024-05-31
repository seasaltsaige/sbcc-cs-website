import React from "react";
import DOMPurify from "dompurify";

import { compiler } from "markdown-to-jsx";

import { Candidate } from "../../types/Candidate.type";

import "./StatementPopup.css";

export function StatementPopup({
  candidate,
  visible,
  close
}: {
  candidate: Candidate,
  visible: boolean,
  close: () => void;
}) {
  return (
    visible ?
      <div className="statement-popup">
        <div className="statement-modal">
          <p className="statement-header">
            <i>{candidate.name}'s</i> statement
          </p>
          <div className="statement">
            {compiler(DOMPurify.sanitize(candidate.statement))}
          </div>
          <button
            className="close-statement modal-button"
            onClick={() => close()}
          >Close</button>
        </div>
      </div>
      : <></>
  )
}