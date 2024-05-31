import React, { useEffect, useState } from "react";

import "./AllCandidates.css";
import { CandidateCotainer, StatementPopup, CreateCandidatePopup, Navbar } from "../../../components";
import { Candidate } from "../../../types/Candidate.type";
import { createCandidate, updateCandidate, getAllCandidates, deleteCandidate } from "../../../api";
import { useAuthHeader } from "react-auth-kit";

// PROTECTED ROUTE
// Must be logged in as officer to access
export function AllCandidates() {

  const authHeader = useAuthHeader();

  const [popupOpen, setPopupOpen] = useState(false);
  const [type, setType] = useState("new" as "new" | "edit");
  const [candidate, setCandidate] = useState(null as null | Candidate);

  const [statementCandidate, setStatementCandidate] = useState({} as Candidate);
  const [statementVisible, setStatementVisible] = useState(false);

  const closeStatement = () => {
    setStatementCandidate({} as Candidate);
    setStatementVisible(false);
  }
  const openStatement = (c: Candidate) => {
    setStatementCandidate(c);
    setStatementVisible(true);
  }

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
        console.log(data, "edit")
        const updated = await updateCandidate(data, auth);
        if (updated.status === 200) {
          await fetchAllCandidates();
        }
        // Update existing candidate
      }
    } catch (err) {
      console.log(err);
    }

    exit();
  }

  const delCandidate = async (_id: string) => {
    const auth = authHeader();
    try {
      const res = await deleteCandidate(_id, auth);
      if (res.status === 200) {
        await fetchAllCandidates();
      }
    } catch (err) {

    }
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
          {
            ["President", "Vice President", "Project Manager", "Secretary", "Treasurer", "Promoter"].map((pos) => (
              allCandidates.filter(cand => cand.position === pos).length > 0 ?
                <div className={`${pos.replaceAll(/\s+/g, "").toLowerCase()} candidates-view`}>
                  <p className="position-title">{pos}</p>
                  <div className={`${pos.replaceAll(/\s+/g, "").toLowerCase()} candidate-scroll-container`}>
                    {

                      allCandidates.filter(cand => cand.position === pos).map((cand, i) => (

                        <CandidateCotainer
                          key={i}
                          candidate={cand}
                          deleteCandidate={() => delCandidate(cand._id)}
                          edit={() => { setCandidate(cand); setType("edit"); setPopupOpen(true); }}
                          useAdmin={true}
                          openStatement={openStatement}
                        />
                      ))

                    }
                  </div>
                </div>
                : <></>
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

      <StatementPopup
        candidate={statementCandidate}
        close={closeStatement}
        visible={statementVisible}
      />
    </>
  )
}