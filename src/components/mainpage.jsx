import React from "react";
import "./mainpage.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="main-page">
      <div className="main-page-overlay">
        <h1 className="main-title">GuideEase</h1>
        <p className="main-subtitle">Explore The Hong Kong Special With Us</p>
        <Link to="/ListPage" className="Links"><button className="main-button">Start Explore</button></Link>
      </div>
    </div>
  );
}

export default MainPage;