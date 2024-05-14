import React, { useEffect, useState } from "react";
import "./CurrentOfficers.css";
import Navbar from "../../../components/Navbar/Navbar";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import OfficerPopup from "../../../components/OfficerPopup/OfficerPopup";
import { OfficerData } from "../../../types/OfficerData.type";
import createOfficer from "../../../api/createOfficer";




export function CurrentOfficers() {

  const [officersData, setOfficersData] = useState<OfficerData[]>([]);
  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const [openOfficer, setOpenOfficer] = useState<OfficerData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<"edit" | "new">("new");

  const close = (clearOfficer?: boolean) => {
    setIsOpen(false);
    setOpenOfficer(null);
  }

  const postUpdate = (officer: OfficerData) => {

  }

  const updateOfficer = async (officer: OfficerData) => {
    const auth = authHeader();
    console.log(auth);
    // Post
    if (type === "new") {
      console.log("new officer", officer);
      try {
        console.log("in try");
        const createRes = await createOfficer(officer, auth);
        console.log(createRes);
      } catch (err) {
        console.log("in err");
        console.log(err);
      }
      console.log("after try");
    }
    // Patch
    // TODO
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