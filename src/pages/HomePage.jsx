import MainContent from "../Component/MainContent";
import LogInTab from "../Component/LogInTab";
import Features from "../Component/Features";

function HomePage() {
  return (
    <div>
      <MainContent></MainContent>
      <hr />
      <div id="login-tab-section">
        <LogInTab></LogInTab>
      </div>
      <hr />
      <Features></Features>
    </div>
  );
}

export default HomePage;
