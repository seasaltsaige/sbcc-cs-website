import React from "react";

import { Candidate } from "../../types/Candidate.type";
import { useIsAuthenticated } from "react-auth-kit";

import "./CandidateContainer.css";

const url = process.env.REACT_APP_URL!;

export function CandidateCotainer(candidate: Candidate, useAdmin: boolean) {
  const isAuth = useIsAuthenticated();

  return (
    <div className="candidate-container">
      <img src={candidate.image ? `${url}/uploads/candidates/${candidate.image}` : "/default.png"} />
      <p className="candidate-name">{candidate.name}</p>
      <p className="candidate-statement-short">{candidate.statement}</p>
      <button className="read-statement-button">Read Statemet</button>
      {
        useAdmin && isAuth() ?
          <div className="admin-buttons">
            <button
              className="admin-button"
            >Edit</button>
            <button
              className="admin-button"
            >Delete</button>
          </div>
          : <></>
      }
    </div>
  )
}