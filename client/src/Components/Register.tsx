import React, { useState, useEffect } from 'react'
import { Iuser } from '../Interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Register(): JSX.Element {
  type T_e = React.ChangeEvent<HTMLInputElement>
  const navigate = useNavigate()
  const [user, setUser] = useState<Iuser>({
    email: "",
    password: ""
  })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("")
    }, 3000);
    return () => clearTimeout(timer);
  }, [error])


  const registerAction = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
      axios.post('http://localhost:5000/register', user)
        .then(res => {
          navigate('/login')
        })
    .catch (err => {
      setError("Email already exists")
    })
  }

  return (
    <div className="login-page">
      {error.length > 0 && <h3 className="error">{error}</h3>}
      <div className="form">
        <form className="login-form">
          <input onChange={(e: T_e) => { setUser({ ...user, email: e.target.value }) }} type="text" placeholder="email" />
          <input onChange={(e: T_e) => { setUser({ ...user, password: e.target.value }) }} type="password" placeholder="password" />
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              registerAction(e)
            }}
          >Register</button>
          <p className="message">Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </div>
  )
}
