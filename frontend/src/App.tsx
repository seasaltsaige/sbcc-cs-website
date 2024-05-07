import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  About,
  CurrentOfficers,
  ElectionsHome,
  Home,
  PastEvents,
  PastOfficers,
  UpcomingEvents,
  Vote
} from "./routes/index";
import { Login } from './routes/Login/Login';

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
        <Route path="/elections/vote" element={<Vote />} />

        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
