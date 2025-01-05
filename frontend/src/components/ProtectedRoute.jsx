/* eslint-disable react/prop-types */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const DemoProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  // Renamed to avoid naming conflict
  async function handleTokenRefresh() {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        setUser(false);
        return;
      }

      const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.data.access) {
        localStorage.setItem("access_token", res.data.access);
        setUser(true);
      } else {
        setUser(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setUser(false);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  useEffect(() => {
    async function checkTokenValidity() {
      const accessToken = localStorage.getItem("access_token");
      
      if (!accessToken) {
        setUser(false);
        return;
      }

      try {
        const { exp } = jwtDecode(accessToken);
        
        if (exp * 1000 < Date.now()) {
          // Token has expired, try to refresh
          await handleTokenRefresh();
        } else {
          // Token is still valid
          setUser(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(false);
      }
    }

    checkTokenValidity();
  }, []);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default DemoProtectedRoute;