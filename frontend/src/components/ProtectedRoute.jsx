import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

/**
 * ProtectedRoute Component - Protects routes that require authentication
 * Checks if user is authenticated and manages token refresh
 */
const ProtectedRoute = ({ children }) => {
  // State to track authentication and loading status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if access token is valid
  const isTokenValid = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now();
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  };

  // Get new access token using refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refreshToken
      });
      
      localStorage.setItem('access_token', response.data.access);
      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  };

  // Main authentication check
  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem('access_token');

      // Case 1: No access token exists
      if (!accessToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Case 2: Access token is still valid
      if (isTokenValid(accessToken)) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Case 3: Access token expired, try to refresh
      const refreshSuccessful = await refreshAccessToken();
      setIsAuthenticated(refreshSuccessful);
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Either show protected content or redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;