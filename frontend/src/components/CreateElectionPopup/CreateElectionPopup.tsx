import React, { useEffect, useState } from "react";

import "./CreateElectionPopup.css";
import { Election } from "../../types/Election.type";
import { Candidate } from "../../types/Candidate.type";

export function CreateElectionPopup({
  election,
  visible,
  close,
  save,
  type,
  allCandidates: candidates,
}: {
  election: Election;
  allCandidates: Array<Candidate>;
  visible: boolean;
  close: () => void;
  save: (electionObject: Election) => void;
  type: "edit" | "new";
}) {

  const [electionObject, setElectionObject] = useState({} as Election);
  const [allCandidates, setAllCandidates] = useState([] as Array<Candidate>);

  const parseDate = () => {
    const date = new Date();
    const [month, day, year] = date.toLocaleString().split(",")[0].split("/");
    return `${year}-${month.length === 1 ? `0${month}` : month}-${day.length === 1 ? `0${day}` : day}`;
  }

  useEffect(() => {
    setElectionObject(election);
    setAllCandidates(candidates);
  }, [election, candidates]);



  return (
    visible
      ? <div className="create-election-popup">
        <div className="create-election-modal">

          {
            ["President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"].map(pos => (
              <div className={`${pos.toLowerCase().replaceAll(/\s+/g, "")}s`}>
                {
                  allCandidates.filter(cand => cand.position === pos).map((cand, i) => (
                    <div className={`candidate-${cand.name.toLowerCase().replaceAll(/\s+/g, "-")}`}>

                    </div>
                  ))
                }
              </div>
            ))
          }

          <div className="times-container">
            <input
              min={parseDate()}
              className="times-date-input"
              type="date"
            />
            <input
              min={Date.now()}
              className="times-start-time-input"
              type="time"
            />
            <input
              className="times-end-time-input"
              type="time"
            />
          </div>

          <div>
            <button onClick={() => save(electionObject)}>Create</button>
            <button onClick={() => close()}>Cancel</button>
          </div>
        </div>
      </div>
      : <></>
  )
}