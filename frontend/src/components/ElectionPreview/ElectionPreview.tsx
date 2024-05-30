import React from "react";

import "./ElectionPreview.css";
import { Election } from "../../types/Election.type";
import { Candidate } from "../../types/Candidate.type";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

export function ElectionPreview({
  election,
  candidates
}: {
  election: Election,
  candidates: Array<Candidate>
}) {

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();

  return (
    <div className="election-preview">

    </div>
  )
}