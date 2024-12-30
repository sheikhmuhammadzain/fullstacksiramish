import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 1, seconds: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAccessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!storedAccessToken || !storedUsername || !refreshToken) {
      alert("You are not signed in. Please sign up first.");
      navigate("/login");
      return;
    }

    setUsername(storedUsername);
    setAccessToken(storedAccessToken);

    // Start 1-minute countdown
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const totalSeconds = prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds < 0) {
          clearInterval(timer);
          handleLogout();
          return prev;
        }

        return {
          minutes: Math.floor(totalSeconds / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="welcome-message">Welcome, {username}!</h1>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="nav-button logout-button">
            Logout
          </button>
        </div>
      </header>
      
      <div className="home-content">
        <div className="content-section">
          <h2 className="section-title">Your Profile</h2>
          <div className="section-content">
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Access Token:</strong></p>
            <div style={{ wordBreak: 'break-all' }}>
              {accessToken}
            </div>
            <div className="token-expiry">
              <h3 className="expiry-title">Session Expires In:</h3>
              <div className="countdown">
                <span className="time-unit">{String(timeRemaining.minutes).padStart(2, '0')}m </span>
                <span className="time-unit">{String(timeRemaining.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
