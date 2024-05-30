import React from "react";

import { Candidate } from "../../types/Candidate.type";
import { useIsAuthenticated } from "react-auth-kit";

import "./CandidateContainer.css";
import { compiler } from "markdown-to-jsx";
import DOMPurify from "dompurify";

const url = process.env.REACT_APP_URL!;

export function CandidateCotainer({ useAdmin, edit, deleteCandidate, candidate, openStatement }: { candidate: Candidate, useAdmin: boolean, edit: () => void; deleteCandidate: () => void; openStatement: (candidate: Candidate) => void; }) {
  const isAuth = useIsAuthenticated();

  return (
    <div className="candidate-container">
      <img className="candidate-image" src={candidate.image ? `${url}/uploads/candidates/${candidate.image}` : "/default.png"} />
      <p className="candidate-name">{candidate.name}</p>
      <div className="candidate-statement-short">
        {compiler(DOMPurify.sanitize(candidate.statement))}
      </div>
      <button className="read-statement-button" onClick={() => openStatement(candidate)}>Read Statemet</button>
      {
        useAdmin && isAuth() ?
          <div className="admin-buttons">
            <button
              className="admin-button"
              onClick={() => edit()}
            >Edit</button>
            <button
              className="admin-button"
              onClick={() => deleteCandidate()}
            >Delete</button>
          </div>
          : <></>
      }
    </div>
  )
}