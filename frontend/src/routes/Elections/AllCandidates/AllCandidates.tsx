import React, { useState } from "react";

import "./AllCandidates.css";
import { CreateCandidatePopup, Navbar } from "../../../components";
import { Candidate } from "../../../types/Candidate.type";

export function AllCandidates() {

  const [popupOpen, setPopupOpen] = useState(false);
  const [type, setType] = useState("new" as "new" | "edit");
  const [candidate, setCandidate] = useState(null as null | Candidate);

  const exit = () => {
    setPopupOpen(false);
    setCandidate(null);
  }

  const saveCandidate = async (data: Candidate) => {
    try {
      // Save new candidate
      if (type === "new") {

      } else {
        // Update existing candidate
      }
    } catch (err) {

    }

    exit();
  }



  return (
    <>
      <Navbar />

      <div className="all-candidates-container">
        <button className="create-candidate" onClick={() => { setType("new"); setCandidate(null); setPopupOpen(true); }}>Create Candidate</button>
        <div className="all-candidates">
          {/* Should have sections for the types of candidates (president, vp, etc...) */}
          {/* Probably should use map */}

        </div>
      </div>

      <CreateCandidatePopup
        visible={popupOpen}
        close={exit}
        save={saveCandidate}
        type={type}
        candidate={candidate}
      />
    </>
  )
}