import React, { useContext } from "react";
import CitizenDashboard from "../pages/CitizenDashboard";
import AuthorityDashboard from "./AuthorityDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  return (
    <div>
      {/* <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1> */}

      {role === "citizen" && <CitizenDashboard />}
      {role === "authority" && <AuthorityDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
};
export default Dashboard;
