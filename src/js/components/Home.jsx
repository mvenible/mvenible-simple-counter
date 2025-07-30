// src/js/components/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import SecondsCounter from './SecondsCounter';  // Fixed import path

function Home() {
  const [seconds, setSeconds] = useState(0);
  const [isCountdown, setIsCountdown] = useState(false);
  const [countdownStart, setCountdownStart] = useState(60);
  const [isRunning, setIsRunning] = useState(true);
  const [alertTime, setAlertTime] = useState('');
  const intervalRef = useRef(null);

  // Main counter logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = isCountdown ? prevSeconds - 1 : prevSeconds + 1;
          
          // Check for countdown reaching zero
          if (isCountdown && newSeconds <= 0) {
            setIsRunning(false);
            alert('Countdown finished! ⏰');
            return 0;
          }
          
          // Check for alert time
          if (alertTime && newSeconds.toString() === alertTime) {
            alert(`Alert! You've reached ${alertTime} seconds! 🔔`);
          }
          
          return newSeconds;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isCountdown, alertTime]);

  // Control functions
  const handleStop = () => setIsRunning(false);
  const handleStart = () => setIsRunning(true);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(isCountdown ? countdownStart : 0);
  };

  const toggleMode = () => {
    setIsRunning(false);
    setIsCountdown(!isCountdown);
    setSeconds(isCountdown ? 0 : countdownStart);
  };

  const handleCountdownStartChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setCountdownStart(value);
    if (isCountdown) {
      setSeconds(value);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="text-center mb-4">
            <h1 className="display-4 text-primary mb-3">
              {isCountdown ? '⏳ Countdown Timer ⏳' : '⏱️ Seconds Counter ⏱️'}
            </h1>
            <p className="lead text-muted">
              {isCountdown 
                ? `Counting down from ${countdownStart} seconds` 
                : 'Counting seconds since the app started'
              }
            </p>
          </div>

          {/* Main Counter Display */}
          <div className="mb-4">
            <SecondsCounter seconds={seconds} />
          </div>

          {/* Controls */}
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <button 
              className={`btn ${isRunning ? 'btn-warning' : 'btn-success'} px-4`}
              onClick={isRunning ? handleStop : handleStart}
            >
              <i className={`fas ${isRunning ? 'fa-pause' : 'fa-play'} me-2`}></i>
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button 
              className="btn btn-secondary px-4"
              onClick={handleReset}
            >
              <i className="fas fa-redo me-2"></i>
              Reset
            </button>
            <button 
              className={`btn ${isCountdown ? 'btn-info' : 'btn-primary'} px-4`}
              onClick={toggleMode}
            >
              <i className={`fas ${isCountdown ? 'fa-arrow-up' : 'fa-arrow-down'} me-2`}></i>
              {isCountdown ? 'Count Up' : 'Countdown'}
            </button>
          </div>

          {/* Settings */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-cog me-2"></i>
                Counter Settings
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {isCountdown && (
                  <div className="col-12 col-md-6">
                    <label htmlFor="countdownStart" className="form-label">
                      <i className="fas fa-hourglass-start me-2"></i>
                      Countdown Start Value
                    </label>
                    <input
                      type="number"
                      id="countdownStart"
                      className="form-control"
                      value={countdownStart}
                      onChange={handleCountdownStartChange}
                      min="1"
                      max="999999"
                    />
                  </div>
                )}
                <div className="col-12 col-md-6">
                  <label htmlFor="alertTime" className="form-label">
                    <i className="fas fa-bell me-2"></i>
                    Alert at (seconds)
                  </label>
                  <input
                    type="number"
                    id="alertTime"
                    className="form-control"
                    value={alertTime}
                    onChange={(e) => setAlertTime(e.target.value)}
                    placeholder="Enter seconds for alert"
                    min="1"
                  />
                  <small className="form-text text-muted">
                    Get notified when reaching this number
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="mt-4 text-center">
            <div className="d-inline-flex align-items-center bg-white rounded-pill px-4 py-2 shadow-sm">
              <span className={`badge ${isRunning ? 'bg-success' : 'bg-secondary'} me-2`}>
                {isRunning ? 'RUNNING' : 'PAUSED'}
              </span>
              <span className="text-muted">
                Mode: {isCountdown ? 'Countdown' : 'Count Up'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;