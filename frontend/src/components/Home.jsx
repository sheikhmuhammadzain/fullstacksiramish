import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import "./Home.css"

const Home = () => {
  const [username, setUsername] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedAccessToken = localStorage.getItem("access_token")
    const refreshToken = localStorage.getItem("refresh_token")

    if (!storedAccessToken || !storedUsername || !refreshToken) {
      alert("You are not signed in. Please sign up first.")
      navigate("/login")
      return
    }

    setUsername(storedUsername)
    setAccessToken(storedAccessToken)
  }, [navigate])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="welcome-message">Welcome, {username}!</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <main className="home-content">
        <section className="content-section">
          <h2>Your Profile</h2>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Access Token:</strong>
          </p>
          <div className="token-display">{accessToken}</div>
        </section>
      </main>
    </div>
  )
}

export default Home
