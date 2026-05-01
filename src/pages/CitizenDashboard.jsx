import { useState, useEffect } from "react";
import styles from "./CitizenDashboard.module.css";
import { IoIosNotifications } from "react-icons/io";
import QuickActions from "../Component/QuickActions";
import ComplaintStatCardContainer from "../Component/ComplaintStatCardContainer";
import ComplaintCardContainer from "../Component/ComplaintCardContainer";
import ComplaintAnalysis from "../Component/ComplaintAnalysis";
import { AiOutlineCheck, AiOutlineHourglass, AiOutlineExclamationCircle } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

function CitizenDashboard() {
  const [userName, setUserName] = useState("Citizen");
  const [complaints, setComplaints] = useState([]);
  const [cardStats, setCardStats] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      // Get the first name, capitalized
      setUserName(name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1));
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch user's complaints
        const compRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/complaints`, { headers });
        if (compRes.ok) {
          const compData = await compRes.json();
          setComplaints(compData);
          
          // Calculate dynamic stats for the cards
          const resolved = compData.filter(c => c.status === "Resolved").length;
          const pending = compData.filter(c => c.status === "Pending").length;
          const inProgress = compData.filter(c => c.status === "In Progress").length;
          
          setCardStats([
            { title: "Resolved", value: resolved, trend: "Up to date", trendValue: 0, Icon: AiOutlineCheck },
            { title: "Pending", value: pending, trend: "Awaiting Action", trendValue: 0, Icon: AiOutlineHourglass },
            { title: "In Progress Complaint", value: inProgress, trend: "Being worked on", trendValue: 0, Icon: AiOutlineExclamationCircle },
            { title: "Total", value: compData.length, trend: "All Time", trendValue: 0, Icon: AiOutlineCheck }
          ]);
        }
      } catch (err) {
        console.error("Error fetching citizen dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.welcome}>
        <div>
          <h1>Welcome Back, {userName}</h1>
          <p>Track your civic complaints and their resolution progress</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <IoIosNotifications className={styles.icon} />
          <button 
            onClick={() => { localStorage.clear(); window.location.href='/login'; }}
            style={{ padding: '8px 16px', background: '#e11d48', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}
            title="Logout"
          >
            <IoIosLogOut size={20} />
            Logout
          </button>
        </div>
      </div>
      <QuickActions></QuickActions>

      <div style={{ margin: "14px 6%" }}>
        {complaints.length > 0 ? (
          <ComplaintAnalysis
            data={complaints}
            size={180}
            stroke={30}
            large={true}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
            No complaints submitted yet to analyze.
          </div>
        )}
      </div>

      <ComplaintStatCardContainer stats={cardStats}></ComplaintStatCardContainer>

      <br />
      <br />
      <ComplaintCardContainer complaints={complaints}></ComplaintCardContainer>
    </>
  );
}

export default CitizenDashboard;
