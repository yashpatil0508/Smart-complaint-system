import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiExternalLink } from "react-icons/fi";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "./Footerr.css";

function Footerr() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // placeholder action - wire to API as needed
    setSubscribed(true);
    setTimeout(() => setEmail(""), 300);
  };

  return (
    <footer className="app-footer fade-up" aria-labelledby="footer-heading">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="brand-mark">SC</div>
          <div>
            <h4 id="footer-heading">SmartComplaint</h4>
            <p className="muted">
              Smart civic issue reporting & management system for modern cities
            </p>
            <div className="socials">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61588895905629"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/in/mahendrasing-chaudhari-98a166328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/CitizenDashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/report">Report an Issue</NavLink>
            </li>
            <li>
              <NavLink to="/map">Live Map</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li>
              <FiMail />{" "}
              <a href="mailto:mahivc2357@gmail.com">
                smartcomplaint@gov.in
              </a>
            </li>
            <li>
              <FiPhone /> <a href="tel:+911234567890">+91 9876543210</a>
            </li>
            <li>
              <FiMapPin /> Smart City Municipal Office, Civic Center, Pune
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Government</h5>
          <ul>
            <li>
              <a
                href="https://pune.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                City Government <FiExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://transport.maharashtra.gov.in/1035/Home"
                target="_blank"
                rel="noopener noreferrer"
              >
                Traffic Department <FiExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://water.maharashtra.gov.in/en/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Water Department <FiExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://www.mahadiscom.in/en/home/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Electricity Board <FiExternalLink />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="bottom-left">
          <small>
            © {new Date().getFullYear()} SmartComplaint — Built for citizens
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footerr;
