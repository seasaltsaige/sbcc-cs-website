import React from "react";
import "./Home.css";
import { CreateCandidatePopup, CreateElectionPopup, Navbar } from "../../../components";
import { useIsAuthenticated } from "react-auth-kit";

export function ElectionsHome() {

  const isAuth = useIsAuthenticated();

  return (
    <>
      <Navbar />
      <div className="elections-home-page">
        {
          isAuth()
            ? (
              <div className="admin-tools">
                <button className="create-election">Create Election</button>
                <button className="create-candidate">Create Candidate</button>
              </div>
            ) : <></>
        }
      </div>

      <CreateCandidatePopup />
      <CreateElectionPopup />
    </>
  )
}