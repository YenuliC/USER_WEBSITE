import React, { useState } from 'react';
import './Navbar.css';
import { Link,  useNavigate  } from 'react-router-dom';
import { auth } from '../firebase'; 

const Navbar = () => {
    const navigate = useNavigate();
    const [showMoreDropdown, setShowMoreDropdown] = useState(false);

    const handleSignOut = () => {
        auth.signOut().then(() => {
          navigate('/');
        });
      };

      const toggleMoreDropdown = () => {
        setShowMoreDropdown(!showMoreDropdown);
      };
      
    return (
        <div className="navbar-container">
                <div className="navbar-item">
                    <Link to="/home" className="navbar-link">
                        <span className="navbar-text">Home</span>
                    </Link>
                </div>

                <div className="navbar-item">
        <div className="navbar-link" onClick={toggleMoreDropdown}>
          <span className="navbar-text">More</span>
          <span className="dropdown-icon">&#x25BC;</span>
        </div>
        {showMoreDropdown && (
          <div className="dropdown-content">
            <Link to="/report-generate" className="navbar-link">
              <span className="navbar-dropdown-text">Report Download</span>
            </Link>
            <Link to="/recommendation" className="navbar-link">
              <span className="navbar-dropdown-text">Recommendation</span>
            </Link>
            <Link to="/report-share" className="navbar-link">
              <span className="navbar-dropdown-text">Report Share</span>
            </Link>
            <Link to="/qrscanpage" className="navbar-link">
              <span className="navbar-dropdown-text">Health Hub App</span>
            </Link>
          </div>
        )}
      </div>


                <div className="navbar-item">
                    <Link to="/dashboard" className="navbar-link">
                        <span className="navbar-text">Dashboard</span>
                    </Link>
                </div>

                <div className="navbar-item">
                    <Link to="/help" className="navbar-link">
                        <span className="navbar-text">Help</span>
                    </Link>
                </div>

                <div className="navbar-item" onClick={handleSignOut}>
                    <span className="navbar-text">  Sign Out</span>
                    <span className="detail-forward-arrow">&#x2192;</span>
                </div>
            </div>
    
    );
}

export default Navbar;
