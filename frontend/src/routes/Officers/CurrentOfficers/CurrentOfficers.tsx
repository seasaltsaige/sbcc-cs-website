import React, { useEffect, useState } from "react";
import "./CurrentOfficers.css";
import Navbar from "../../../components/Navbar/Navbar";
import { useIsAuthenticated } from "react-auth-kit";
import OfficerPopup from "../../../components/OfficerPopup/OfficerPopup";

type OfficersData = {
  name?: string | null | undefined;
  position?: "Club President" | "Vice President" | "Project Manager" | "Secretary" | "Tresurer" | "Promoter" | null | undefined;
  startDate?: Date;
  endDate?: Date;
  statement?: string;
  image?: string, // tbd;
  _id?: string;
}


export function CurrentOfficers() {

  const [officersData, setOfficersData] = useState<OfficersData[]>([]);
  const isAuth = useIsAuthenticated();

  const [openOfficer, setOpenOfficer] = useState<OfficersData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<"edit" | "new">("new");

  const close = (clearOfficer?: boolean) => {
    setIsOpen(false);
    setOpenOfficer(null);
  }

  const postUpdate = (officer: OfficersData) => {

  }

  const updateOfficer = (officer: OfficersData) => {
    // Post
    if (type === "new") {
      console.log("new officer", officer);
    }
    // Patch
    else {

    }
  }


  useEffect(() => {
    (async () => {

    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="officers">
        <p className="club-officers-text">Current Club Officers</p>
        <div className={`horizontal-flow-container ${officersData.length < 1 ? "empty" : ""}`}>
          {
            // Will have logic for display all current officers
            officersData.length > 0 ? <></>
              : <h1>No officers to display</h1>
          }
        </div>
        {
          isAuth() ?
            <button
              className="create-officer"
              onClick={() => { setType("new"); setIsOpen(true); console.log("HELp") }}
            >
              Create new Officer
            </button>
            : <></>
        }
      </div>

      <OfficerPopup
        isOpen={isOpen}
        close={close}
        officerData={openOfficer}
        updateOfficer={updateOfficer}
        type={type}
      />
    </div>
  )
}