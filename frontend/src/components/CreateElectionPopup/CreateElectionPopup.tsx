import React, { useEffect, useState } from "react";

import "./CreateElectionPopup.css";
import { Election } from "../../types/Election.type";

export function CreateElectionPopup({
  election,
  visible,
  close,
  save,
  type,
}: {
  election: Election;
  visible: boolean;
  close: () => void;
  save: (electionObject: Election) => void;
  type: "edit" | "new";
}) {

  const [electionObject, setElectionObject] = useState({} as Election);

  useEffect(() => {
    setElectionObject(election);
  }, [election]);

  return (
    visible
      ? <div className="create-election-popup">
        <div className="create-election-modal">

          <div>
            <button onClick={() => save(electionObject)}>Save</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
      : <></>
  )
}