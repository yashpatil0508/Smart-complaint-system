import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-headline">Report. Track. Improve Your City.</h1>
          <p className="hero-subtitle">
            A modern civic complaint management system designed to make your
            city better. Report issues, track progress, and connect with your
            local authorities in real-time.
          </p>
          <div className="hero-actions">
            <button className="btn-primary btn-large">Report an Issue</button>
            <button className="btn-ghost btn-large">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
