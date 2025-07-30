// src/js/components/SecondsCounter.jsx
import React from 'react';

function SecondsCounter({ seconds }) {
  // Convert seconds to individual digits (6 digits max: 999999 seconds)
  const formatSeconds = (totalSeconds) => {
    const absSeconds = Math.abs(totalSeconds);
    return absSeconds.toString().padStart(6, '0').split('');
  };

  const digits = formatSeconds(seconds);

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white p-4 rounded shadow-lg" style={{ fontFamily: 'monospace', fontSize: '3rem' }}>
      {/* Clock Icon */}
      <div className="me-3">
        <i className="fas fa-clock" style={{ fontSize: '2.5rem' }}></i>
      </div>
      
      {/* Digits Display */}
      {digits.map((digit, index) => (
        <div 
          key={index}
          className="bg-secondary text-center mx-1 rounded counter-digit"
          style={{ 
            width: '60px', 
            height: '80px', 
            lineHeight: '80px',
            border: '2px solid #495057'
          }}
        >
          {digit}
        </div>
      ))}
    </div>
  );
}

export default SecondsCounter;