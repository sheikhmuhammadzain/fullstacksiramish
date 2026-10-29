import axios from "axios"
import React, {useRef} from "react"
import {useNavigate} from "react-router-dom"

const DemoSignup = () => {
  const userNameRef = useRef()
  const passRef = useRef()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/api/signup/", {
        username: userNameRef.current.value,
        password: passRef.current.value,
      })

      alert("sinup sucressfull")
      navigate("/login")
    } catch (error) {
      alert("not siging in there is some error ")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={userNameRef} />
        <input type="password" ref={passRef} />
        <button type="submit">signup</button>
      </form>
    </div>
  )
}

export default DemoSignup
