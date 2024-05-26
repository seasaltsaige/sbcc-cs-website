import React, { useEffect } from "react";
import "./Vote.css";
import { Navbar } from "../../../components";
import { useParams } from "react-router-dom";

export function Vote() {
  const { _id } = useParams();


  useEffect(() => {
    // Fetch election
  }, [_id]);
  return (
    <div>
      <Navbar />
      <div>
        Elections Voting Page
      </div>
    </div>
  )
}