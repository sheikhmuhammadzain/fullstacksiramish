import  {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

const DemoHome = () => {
  const navigate = useNavigate()
  const [Username, setUsername] = useState("")
  const [AccessToken, setAccessToken] = useState("")

  function checkUserName() {
    const storedUsername = localStorage.getItem("username")
    const storedAccessToken = localStorage.getItem("access_token")
    const storedRefresh = localStorage.getItem("refresh_token")

    if (!storedUsername || !storedAccessToken || !storedRefresh) {
      alert("you are not signed in ")
      navigate("/login")
      return
    }
    setAccessToken(storedAccessToken)
    setUsername(storedUsername)
  }
  function handleLogout() {
    localStorage.clear()
    navigate("/login")
  }
  useEffect(() => checkUserName(), [navigate])

  return (
    <div>
      <button onClick={handleLogout}>
        <h1>Logout</h1>
      </button>
      <h1>{Username}</h1>
      <p>{AccessToken}</p>
    </div>
  )
}

export default DemoHome
