import { NavLink} from "react-router-dom";
import { useTheme } from "../context/useTheme.js";
import { useState } from 'react'
import '../css/home.css'

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { toggleTheme } = useTheme();

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
    };

  return (
    <header className="header">
      
      <nav className="nav">
        {/* Desktop navigation - hidden on mobile */}
        <div className="nav-desktop">
          <NavLink to="/" className="endpoint">Home</NavLink>
          <NavLink to="/about" className="endpoint">About</NavLink>
          <NavLink to="/projects" className="endpoint">Portfolio</NavLink>
          <NavLink to="/contact" className="endpoint">Contact</NavLink>
        </div>

        {/* Mobile hamburger menu button */}
        <div className="nav-mobile">
          <button 
            className={`endpoint hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            menu
          </button>

          {/* Mobile navigation dropdown */}
          <div className={`nav-dropdown ${isMenuOpen ? 'open' : ''}`}>
            <NavLink 
              to="/" 
              className="endpoint" 
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className="endpoint" 
              onClick={closeMenu}
            >
              About
            </NavLink>
            <NavLink 
              to="/projects" 
              className="endpoint" 
              onClick={closeMenu}
            >
              Portfolio
            </NavLink>
            <NavLink 
              to="/contact" 
              className="endpoint" 
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="theme-toggle">
        <span className="toggle-label">theme</span>
        <div className="toggle-switch" onClick={toggleTheme}></div>
      </div>
    </header>
  );

}

export default Header