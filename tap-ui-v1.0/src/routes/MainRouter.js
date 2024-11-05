import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientSidebarView from "../views/ClientSidebarView";
import ClientDashboardView from "../views/ClientDashboardView";
const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientDashboardView />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
