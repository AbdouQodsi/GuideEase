import React, { useState } from "react";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "tourist", 
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Check if any field is empty
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("All fields are required!");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setErrorMessage("");

    try {
    const dataToSend = {
      ...formData,
    };
    
      const response = await axios.post("http://localhost:5000/api/auth/signup", dataToSend);
 
        if (response.status === 200 || response.status === 201) {
          alert("Signup Successful!");
          setFormData({
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            userType: "tourist",
          });
          navigate("/login");

      } else {
        setErrorMessage(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }

  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <Link to="/login" className="Links"><button className="back-button">←</button></Link>
        <h1 className="signup-title">Create Your Account</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter your first name"
            className="signup-input"
            value={formData.firstname}
            onChange={handleChange}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your last name"
            className="signup-input"
            value={formData.lastname}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="signup-input"
            value={formData.phone}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="signup-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="signup-links">
          Already have an account? <a href="/login">Login</a>
        </div>
        <div className="signup-divider">Or sign up with</div>
        <div className="signup-socials">
          <button className="social-button">F</button>
          <button className="social-button">G</button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;