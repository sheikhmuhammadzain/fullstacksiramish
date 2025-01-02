/* eslint-disable react/prop-types */
import {useEffect, useState} from "react"
import {Navigate} from "react-router-dom"
import jwtDecode from "jwt-decode"
import axios from "axios"

const ProtectedRoute = ({children}) => {
  const [user, setUser] = useState(null) // null for initial loading state

  // Function to refresh the access token
  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/refresh/",
        {
          refresh: localStorage.getItem("refresh"),
        }
      )
      localStorage.setItem("access", response.data.access)
      console.log("Access token refreshed")
      setUser(true) // Token refreshed, user is authenticated
    } catch (error) {
      console.error("Error refreshing token:", error)
      setUser(false) // Unable to refresh, user is not authenticated
    }
  }

  // Effect to check token validity on component mount
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("access")
      const refresh = localStorage.getItem("refresh")

      if (token) {
        try {
          const {exp} = jwtDecode(token)
          if (exp * 1000 < Date.now()) {
            // Token expired, attempt to refresh
            if (refresh) {
              await refreshToken()
            } else {
              setUser(false) // No refresh token available
            }
          } else {
            setUser(true) // Token is valid
          }
        } catch (error) {
          console.error("Error decoding token:", error)
          setUser(false) // Invalid token
        }
      } else {
        setUser(false) // No access token available
      }
    }

    checkTokenValidity()
  }, []) // Runs only once on component mount

  if (user === null) {
    return <div>Loading...</div> // Show loading state while checking authentication
  }

  return user ? children : <Navigate to="/login" /> // Redirect to login if not authenticated
}

export default ProtectedRoute
