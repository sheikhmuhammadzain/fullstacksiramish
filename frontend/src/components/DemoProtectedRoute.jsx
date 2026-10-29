import axios from "axios"
import {jwtDecode} from "jwt-decode"
import {useEffect, useState} from "react"
import {Navigate} from "react-router-dom"

const DemoProtectedRoute = ({children}) => {
  const [User, setUser] = useState(null)

  useEffect(() => {
    async function checkTokenValidity() {
      const access = localStorage.getItem("access_token")
      if (!access) {
        setUser(false)
        return
      }
      const {exp} = jwtDecode(access)
      if (exp * 1000 < Date.now()) {
        await handleRefresh()
      } else {
        setUser(true)
      }
    }
    checkTokenValidity()
  }, [])

  async function handleRefresh() {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: localStorage.getItem("refresh_token"),
      })
      localStorage.setItem("access_token", res.data.access)
      setUser(true)
    } catch (error) {
      setUser(false)
      localStorage.clear()
    }
  }

  if (User === null) {
    return <p>Loading</p>
  }
  return User ? children : <Navigate to="/login" replace />
}

export default DemoProtectedRoute
