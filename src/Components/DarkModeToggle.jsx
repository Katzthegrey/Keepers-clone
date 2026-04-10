// Cursor code: navbar sun/moon toggle for global theme
import React from 'react';

const DarkModeToggle = ({ theme, onToggleTheme }) => {
  const isDark = theme === 'dark'; // Cursor code

  return (
    <div className="tooltip">
      <button
        type="button"
        className="dark-mode-toggle"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDark}
      >
        <span className="material-icons-outlined hover" aria-hidden="true">
          {isDark ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
      <span className="tooltip-text">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </div>
  );
};

export default DarkModeToggle;
