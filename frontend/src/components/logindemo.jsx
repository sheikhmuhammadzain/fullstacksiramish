import axios from "axios"
import {useRef} from "react"
import {useNavigate} from "react-router-dom"

const Logindemo = () => {
  const inputRef = useRef()
  const passRef = useRef()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await axios.post(
        "http://localhost:8000/api/token/",

        {
          username: inputRef.current.value,
          password: passRef.current.value,
        }
      )
      localStorage.setItem("access_token", res.data.access)
      localStorage.setItem("refresh_token", res.data.refresh)
      localStorage.setItem("username", inputRef.current.value)

      navigate("/home")
    } catch (error) {
      console.error("invalid credential", error)
      alert("invalid credential")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="enter the email" ref={inputRef} />
        <input type="password" placeholder="enter the password" ref={passRef} />
        <button type="submit">sumbit</button>
      </form>
    </div>
  )
}

export default Logindemo
