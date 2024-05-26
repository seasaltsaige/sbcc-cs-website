import React, { useEffect, useState } from "react";

import "./AllCandidates.css";
import { CreateCandidatePopup, Navbar } from "../../../components";
import { Candidate } from "../../../types/Candidate.type";
import { createCandidate, updateCandidate, getAllCandidates } from "../../../api";
import { useAuthHeader } from "react-auth-kit";

// PROTECTED ROUTE
// Must be logged in as officer to access
export function AllCandidates() {

  const authHeader = useAuthHeader();

  const [popupOpen, setPopupOpen] = useState(false);
  const [type, setType] = useState("new" as "new" | "edit");
  const [candidate, setCandidate] = useState(null as null | Candidate);

  const [allCandidates, setAllCandidates] = useState([] as Array<Candidate>);

  const exit = () => {
    setPopupOpen(false);
    setCandidate(null);
  }

  const fetchAllCandidates = async () => {
    const res = await getAllCandidates();
    if (res.status === 200) {
      setAllCandidates(res.data.candidates as Array<Candidate>);
    }
  }

  const saveCandidate = async (data: Candidate) => {
    const auth = authHeader();
    try {
      // Save new candidate
      if (type === "new") {
        const created = await createCandidate(data, auth);
        if (created.status === 200) {
          await fetchAllCandidates();
        }
      } else {
        const updated = await updateCandidate(data, auth);
        if (updated.status === 200) {
          await fetchAllCandidates();
        }
        // Update existing candidate
      }
    } catch (err) {

    }

    exit();
  }


  useEffect(() => {
    (async () => await fetchAllCandidates())();
  }, []);


  return (
    <>
      <Navbar />

      <div className="all-candidates-container">
        <button className="create-candidate" onClick={() => { setType("new"); setCandidate(null); setPopupOpen(true); }}>Create Candidate</button>
        <div className="all-candidates">
          {/* Should have sections for the types of candidates (president, vp, etc...) */}
          {/* Probably should use map */}
          {
            ["President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"].map((pos) => (
              <div className={`${pos.replaceAll(/\s+/g, "").toLowerCase()}`}>
                {
                  allCandidates.filter(cand => cand.position === pos).map(cand => (
                    // Candidate container component this is temp
                    <div className="candidate">{cand.name} {cand.statement} {cand.position}</div>
                  ))
                }
              </div>
            ))
          }
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