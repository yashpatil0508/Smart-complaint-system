// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import VerticalTabs from "./Component/VerticalTabs";
// import Header from "./Component/Header";
// import MainContent from "./Component/MainContent";
// import SignUp from "./Component/SignUp";
// import Footerr from "./Component/Footerr";
// import Features from "./Component/Features";

// function App() {
//   return (
//     <div>

//       <Header></Header>
//       <MainContent></MainContent>
//       <hr />
//       <VerticalTabs></VerticalTabs>
//       <hr />
//       <SignUp></SignUp>
//       <hr />
//       <Features></Features>
//       <hr />
//       <Footerr></Footerr>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import HomePage from "./pages/HomePage";
import CitizenDashboard from "./pages/CitizenDashboard";
import ReportIssue from "./pages/ReportIssue";
import LiveMap from "./pages/LiveMap";
import AboutUs from "./pages/AboutUs";
import Support from "./pages/Support";
import SignUpTab from "./pages/SignUpTab";
import LogInTab from "./Component/LogInTab";
import Dashboard from "./Component/Dashboard";
import AdminDashboard from "./Component/AdminDashboard";
import AuthorityDashboard from "./Component/AuthorityDashboard";
import Footerr from "./Component/Footerr";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CitizenDashboard" element={<ProtectedRoute><CitizenDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/authority-dashboard" element={<ProtectedRoute><AuthorityDashboard /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<SignUpTab />} />
        <Route path="/login" element={<LogInTab />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      <Footerr></Footerr>
    </>
  );
}

export default App;
