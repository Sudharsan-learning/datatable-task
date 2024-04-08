import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplianceInfo from "./pages/ApplianceInfo";
import Dashboard from "./pages/Dashboard";
import "./styles/dashboard.css";
import "./styles/base.css";
import "./styles/information.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:id" element={<ApplianceInfo />} />
      </Routes>
    </>
  );
}

export default App;
