import React from "react";


import { Candidate } from "../../types/Candidate.type";

import "./CandidateStatementPopup.css";

export function CandidateStatementPopup({
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
      <div className="candidate-statement-popup">
        <div className="candidate-statement-modal">
          <p className="candidate-statement-header">
            <i>{candidate.name}'s</i> statement
          </p>
          <p className="candidate-statement">
            {candidate.statement}
          </p>

          <button
            className="close-candidate-statement modal-button"
            onClick={() => close()}
          >Close</button>
        </div>
      </div>
      : <></>
  )
}