import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";

import "./CreateCandidatePopup.css";
import { Candidate } from "../../types/Candidate.type";

const url = process.env.REACT_APP_URL!;

export function CreateCandidatePopup({
  visible,
  close,
  save,
  type,
  candidate
}: {
  visible: boolean;
  close: () => void;
  save: (candidate: Candidate) => void;
  type: "new" | "edit",
  candidate: Candidate | null;
}) {

  const [candidateObject, setCandidateObject] = useState({} as Candidate);
  const [fileName, setFileName] = useState("");

  const editCandidate = (update: Partial<Candidate>) => {
    setCandidateObject((old) => ({ ...old, ...update }));

    console.log(candidateObject);
  }

  useEffect(() => {
    if (candidate)
      setCandidateObject(candidate);
  }, [candidate]);

  return (
    visible
      ? (
        <div className="candidate-popup">
          <div className="candidate-modal">
            <p className="candidate-header-text">{type === "new" ? "Create a new" : "Edit "} Candidate</p>


            <div className="image-preview-container">
              <img
                src={
                  candidateObject.image
                    ? (
                      typeof candidateObject.image === "string" ? `${url}/uploads/candidates/${candidateObject.image}`
                        : URL.createObjectURL(candidateObject.image)
                    )
                    : "/default.png"}
                alt="Officer Image"
                className="image-preview"
              />

              <div className="image-upload">
                <button
                  className="image-upload-input modal-button"
                  onClick={() => document.getElementById("profile-upload")?.click()}
                >
                  Upload Image
                  <input
                    id="profile-upload"
                    hidden
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="profileImage"
                    onChange={(ev) => { setFileName(ev.target.files?.[0].name!); editCandidate({ image: ev.target.files?.[0] }); }}
                  />
                </button>
                <p className="image-name">{fileName === "" ? "No image selected" : (fileName.length > 21 ? `${fileName.slice(0, 21)}.${fileName.split(".")[fileName.split(".").length - 1]}` : fileName)}</p>
              </div>
            </div>

            <div className="candidate-name-container">
              <p className="candidate-name">Candidate Name</p>
              <input
                className="candidate-name-input"
                type="text"
                defaultValue={candidateObject.name || ""}
                onChange={(ev) => editCandidate({ name: ev.target.value })}
              />
            </div>

            <div className="candidate-statement-container">
              <textarea
                className="candidate-statement-input"
                defaultValue={candidateObject.statement || ""}
                onChange={(ev) => editCandidate({ statement: ev.target.value })}
              />
            </div>

            <div>
              <Dropdown
                placeholder="Select a position"
                className="officer-type-dropdown"
                controlClassName="officer-type-dropdown"
                value={candidateObject.position}
                options={["President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"]}
                onChange={(ev) => editCandidate({ position: ev.value as any })}
              />
            </div>

            {/* TODO: finish create/edit panel */}
            {/*  Work on fetching all candidates */}
            {/* Work on create event popup */}
            {/* Work on fetching event */}
            {/* Work on voting */}



            <div className="buttons">
              <button className="modal-button" onClick={() => { setFileName(""); save(candidateObject); setCandidateObject({} as Candidate); }} >Save</button>
              <button className="modal-button" onClick={() => { setFileName(""); setCandidateObject({} as Candidate); close(); }}>Cancel</button>
            </div>
          </div>
        </div>
      ) : <></>
  )
}