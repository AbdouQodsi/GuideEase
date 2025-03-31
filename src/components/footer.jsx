import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Blog</li>
            <li>Press Room</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Payment Methods Possible</h4>
          <img src="https://landing.moqups.com/img/help-center/115010765209/02._Your_Account_-_Logos_.jpg" alt="Payment Methods" />
        </div>
        <div className="footer-section">
          <h4>Join Us</h4>
          <p>Become a Tour Guide for Us</p>
          <div className="footer-socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📷</span>
            <span>📌</span>
          </div>
        </div>
      </div>
      <p className="footer-copyright">
        © 2021 Tour Guide. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;