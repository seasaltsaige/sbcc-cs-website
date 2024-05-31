import React from "react";

import "./OfficerContainer.css";
import { useIsAuthenticated } from "react-auth-kit";
import { OfficerData } from "../../types/OfficerData.type";

const URL = process.env.REACT_APP_URL;

export function OfficerContainer({
  officer,
  editOfficer,
  deleteOfficer,
}: {
  officer: OfficerData;
  editOfficer: () => void;
  deleteOfficer: () => void;
}) {
  const isAuth = useIsAuthenticated();

  return <>
    <div className="officer-panel">
      <p className="officer-position">{officer.position}</p>
      <img
        className="officer-image"
        src={
          officer.image !== null
            ? `${URL}/uploads/officers/${officer.image}`
            : "/default.png"
        }
        alt="Officer Image"
      />
      <p className="officer-name">{officer.name}</p>
      <p className="officer-tenure">{`${new Date(officer.startDate as unknown as number).toLocaleDateString()} to ${new Date(officer.endDate as unknown as number).toLocaleDateString()}`}</p>
      <div className="officer-statement-paragraph">
        <p>{officer.statement}</p>
      </div>
      {
        isAuth()
          ? (
            <div className="admin-buttons">
              <button
                onClick={() => editOfficer()}
                className="edit officer-admin-button"
              >
                Edit
              </button>
              <button
                onClick={() => deleteOfficer()}
                className="delete officer-admin-button"
              >
                Delete
              </button>
            </div>
          )
          : <></>
      }
    </div>
  </>
}