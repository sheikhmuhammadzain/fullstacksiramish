/* eslint-disable react/prop-types */
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import {useEffect, useState} from "react"
import {Navigate} from "react-router-dom"

const DemoProtectedRoute = ({children}) => {
  const [user, setuser] = useState(null)

  async function refreshToken() {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: localStorage.getItem("refresh_token"),
      })
      localStorage.setItem("access_token", res.data.access)
      setuser(true)
    } catch (error) {
      alert("error fetching the user ", error)
      setuser(false)
    }
  }

  async function checkTokenValidity() {
    const accessToken = localStorage.getItem("access_token")
    const refreshToken = localStorage.getItem("refresh_token")
    if (accessToken) {
      const {exp} = jwtDecode(accessToken)
      if (exp * 1000 < Date.now()) {
        if (refreshToken) {
          await refreshToken()
        } else {
          setuser(false)
        }
        setuser(true)
      } else {
        setuser(false)
      }
    } else {
      setuser(false)
    }
  }
  useEffect(() => checkTokenValidity(), [])

  if (user === null) {
    return <div>Loading</div>
  }

  return user ? children : <Navigate to="/login" />
}

export default DemoProtectedRoute
