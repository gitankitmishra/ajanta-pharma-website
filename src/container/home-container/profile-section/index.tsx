import React, { FC } from "react";
import "./style.css";

const HomeProfileSection: FC = () => {
  return (
    <section className="home-profile-main-section">
      <h3 className="home-profile-section-welcome-msg">Welcome Anushka</h3>
      <p className="home-profile-section-welcome-description">
        Here is the overview of your courses
      </p>
      <div className="home-profile-slider">
        <p>Ajanta Pharma Awards & Accolades</p>
      </div>
    </section>
  );
};

export default HomeProfileSection;
