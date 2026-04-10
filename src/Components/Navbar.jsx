// Cursor code: wires DarkModeToggle into the navbar
import React from 'react';
import '../Styles/NavbarStyles.css';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ searchTerm, onSearchChange, theme, onToggleTheme }) => {
  return (
    <div className='navbar-container'>
      <div className='logo-area'>
        <div className='tooltip'>
          <span className='material-icons-outlined hover'>menu</span>
          <span className='tooltip-text'>Main Menu</span>
        </div>

        <img src='https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png' alt='Logo'/>
        <span className='logo-text'>Keep</span>
      </div>

      <div className='search-area'>
        <div className="tooltip">
          <span className='material-icons-outlined hover'>search</span>
          <span className='tooltip-text'>Search</span>
        </div>
           <input 
          className='search-input' 
          type='text' 
          placeholder='Search' 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {/* Grouped right-side icons */}
      <div className="navbar-right">
        <div className="setting-area">
          <div className="tooltip">
            <span className='material-icons-outlined hover'>refresh</span>
            <span className='tooltip-text'>Refresh</span>
          </div>

          <div className="tooltip">
            <span className='material-icons-outlined hover'>view_agenda</span>
            <span className='tooltip-text'>List View</span>
          </div>

          <div className="tooltip">
            <span className='material-icons-outlined hover'>settings</span>
            <span className='tooltip-text'>Settings</span>
          </div>
          <DarkModeToggle theme={theme} onToggleTheme={onToggleTheme} /> {/* Cursor code */}
        </div>

        <div className="profile-area-actions">
          <div className="tooltip">
            <span className='material-icons-outlined hover'>apps</span>
            <span className='tooltip-text'>Apps</span>
          </div>
          <div className="tooltip logout">
            <span className='material-icons-outlined hover'>account_circle</span>
            <span className='tooltip-text'>Logout</span>
            <span className="auth-user"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar