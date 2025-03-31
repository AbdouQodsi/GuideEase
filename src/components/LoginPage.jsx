import React, { useState }  from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (response.status === 200) {
        alert("Login successful!");
        console.log("User data:", response.data.user);

        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("userLogin")); 
        navigate("/"); 
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <Link to='/' className="Links"><button className="back-button">←</button></Link>
        <h1 className="login-title">Welcome Back</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
          />
          {errorMessage && <div className="login-error">{errorMessage}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-links">
          <a href="/forgot-password">Forgot Password?</a> |{" "}
          <a href="/signup">Sign Up</a>
        </div>
        <div className="login-divider">Or login with</div>
        <div className="login-socials">
          <button className="social-button">F</button>
          <button className="social-button">G</button>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;