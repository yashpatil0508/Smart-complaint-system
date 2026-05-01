import img2 from "../assets/img2.jpeg";


function MainContent() {
  const handleLoginClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const loginTab = document.getElementById("login-tab-section");
      if (loginTab) {
        loginTab.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-0 rounded-3 border shadow-lg overflow-hidden">
        <div className="col-lg-7 p-4 p-lg-5 d-flex flex-column justify-content-center">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Smart Complaint And Civic Issue Management
          </h1>
          <p className="lead" style={{ textAlign: "justify" }}>
            The Smart Complaint and Civic Issue Management System is a digital
            platform designed to help citizens report and manage civic issues
            efficiently. Users can submit complaints related to problems such as
            potholes, garbage, water supply, or street lights by providing
            details, photos, and location information. The system forwards these
            complaints to the concerned authorities and allows users to track
            the status in real time. This project improves transparency, reduces
            manual effort, and ensures faster resolution of civic problems.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
            <button className="btn btn-primary btn-lg px-4" type="button">
              <a
                href="#login-tab-section"
                className="nav-link"
                style={{ color: "white", textDecoration: "none" }}
                onClick={handleLoginClick}
              >
                Login
              </a>
            </button>
          </div>
        </div>
        <div className="col-lg-5 p-0 d-flex overflow-hidden">
          <img src={img2} alt="" style={{ width: "100%", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
