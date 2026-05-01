import React from "react";
import "./ComplaintProgressStepper.css";

function ComplaintProgressStepper({ currentStep, totalSteps }) {
  const steps = [
    { id: 1, title: "Complaint Type", icon: "📋" },
    { id: 2, title: "Title", icon: "📝" },
    { id: 3, title: "Description", icon: "📄" },
    { id: 4, title: "Personal Info", icon: "👤" },
    { id: 5, title: "Proof", icon: "📸" },
  ];

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="progress-container">
      <div className="stepper-wrapper">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={`step ${currentStep >= step.id ? "completed" : ""} ${
                currentStep === step.id ? "active" : ""
              }`}
            >
              <div className="step-circle">
                {currentStep > step.id ? (
                  <span className="checkmark">✓</span>
                ) : (
                  <span className="step-number">{step.id}</span>
                )}
              </div>
              <div className="step-label">{step.title}</div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`step-connector ${
                  currentStep > step.id ? "completed" : ""
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="progress-bar-wrapper">
        <div className="progress-bar-background">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    </div>
  );
}

export default ComplaintProgressStepper;
