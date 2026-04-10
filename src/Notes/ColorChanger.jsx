import React, { useState } from 'react';
import '../Styles/ColorPaletStyles.css';

const ColorPalette = ({ onSelectColor, currentColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: 'White', code: '#ffffff' },
    { name: 'Red', code: '#f28b82' },
    { name: 'Orange', code: '#fbbc04' },
    { name: 'Yellow', code: '#fff475' },
    { name: 'Green', code: '#ccff90' },
    { name: 'Teal', code: '#a7ffeb' },
    { name: 'Blue', code: '#cbf0f8' },
    { name: 'Dark Blue', code: '#aecbfa' },
    { name: 'Purple', code: '#d7aefb' },
    { name: 'Pink', code: '#fdcfe8' },
    { name: 'Brown', code: '#e6c9a8' },
    { name: 'Gray', code: '#e8eaed' },
  ];

  const handleColorSelect = (colorCode) => {
    onSelectColor(colorCode);
    setIsOpen(false);
  };

  return (
    <div className="color-palette-container">
      <div className="tooltip">
        <span 
          className="material-icons-outlined hover palette-icon"
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: currentColor !== '#ffffff' ? currentColor : 'transparent' }}
        >
          palette
        </span>
        <span className="tooltip-text">Change color</span>
      </div>

      {isOpen && (
        <>
          <div className="color-palette-overlay" onClick={() => setIsOpen(false)} />
          <div className="color-palette">
            {colors.map((color) => (
              <div
                key={color.code}
                className={`color-option ${currentColor === color.code ? 'active' : ''}`}
                style={{ backgroundColor: color.code }}
                onClick={() => handleColorSelect(color.code)}
                title={color.name}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPalette;