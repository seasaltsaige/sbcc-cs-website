import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, CurrentOfficers, ElectionsHome, Home, PastEvents, PastOfficers, UpcomingEvents, Vote, Login, AllCandidates } from "./routes";
import { RequireAuth } from 'react-auth-kit';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/officers/present" element={<CurrentOfficers />} />
        <Route path="/officers/past" element={<PastOfficers />} />
        <Route path="/events/upcoming" element={<UpcomingEvents />} />
        <Route path="/events/past" element={<PastEvents />} />
        <Route path="/elections" element={<ElectionsHome />} />
        <Route path="/elections/vote/:_id" element={<Vote />} />
        <Route path="/elections/candidates" element={
          <RequireAuth loginPath="/elections">
            <AllCandidates />
          </RequireAuth>
        } />

        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
