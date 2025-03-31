import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
  
    loadUser(); 

    window.addEventListener("userLogin", loadUser);
    window.addEventListener("userLogout", loadUser);
    window.addEventListener("userUpdate", loadUser); 
    window.addEventListener("userUpdate2", loadUser); 
  
    return () => {
      window.removeEventListener("userLogin", loadUser);
      window.removeEventListener("userLogout", loadUser);
      window.removeEventListener("userUpdate", loadUser);
      window.addEventListener("userUpdate2", loadUser); 
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/login");
  };
  


  return (
    <nav className="navbar">
      <Link to='/' className="Links"><div className="navbar-logo">GuideEase</div></Link>
      <ul className="navbar-links">
        <Link to='/' className="Links"><li>Home</li></Link>
        <Link to="/ListPage" className="Links"><li>Destinations List</li></Link>
        <Link to='/TourGuide-SignUp' className="Links"><li>Join As Tour Guides</li></Link>
        <Link to='/ReportTour' className="Links"><li>Report Tour</li></Link>
        {/* <Link to='/Login' className='Links'><button className="navbar-signin">Login</button></Link> */}
 
        {user ? (
          <div className="navbar-user" onClick={() => setShowDropdown(!showDropdown)}>
            <button className="navbar-username">{user.firstname} ⌄</button>
            {showDropdown && (
              <div className="navbar-dropdown">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                {user.userType === "tourguide" && (
                  <>
                  <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                  <Link to="/booking" className="dropdown-item">Booking</Link>
                  <Link to="/reviews" className="dropdown-item">Reviews</Link>
                </>
                )}
                {user.userType === "admin" && (
                  <Link to="/admin/reports" className="dropdown-item">Dashboard</Link>
                )}
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="Links">
            <button className="navbar-signin">Login</button>
          </Link>
        )}

      </ul>
      
    </nav>
  );
}

export default Navbar;