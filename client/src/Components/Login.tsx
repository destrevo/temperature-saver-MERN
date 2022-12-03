import React, { useState, useEffect, useContext} from 'react'
import {DataContext} from '../Context/Context'
import { Iuser } from '../Interfaces/Interfaces';
import axios from 'axios';

export default function Login(): JSX.Element {
  type T_e = React.ChangeEvent<HTMLInputElement>
  const { setUser, setData } = useContext(DataContext)
  //L as in local
  const [user, setL_User] = useState<Iuser>({
    email: "",
    password: ""
  })
  const [error, setError] = useState<string>("")

  const loginAction = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
      axios.post('http://localhost:5000/login', user)
        .then(res => {
           setData(res.data.data)
           sessionStorage.setItem('user', JSON.stringify({token:res.data.token}))
           localStorage.setItem('data', JSON.stringify(res.data.data))
           setUser(true)
        })
    .catch (err => {
      setError("Something went wrong")
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("")
    }, 3000);
    return () => clearTimeout(timer);
  }, [error])

  return (
    <div className="login-page">
      {error.length > 0 && <h3 className="error">{error}</h3>}
      <div className="form">
        <form className="login-form">
          <input onChange={(e: T_e) => { setL_User({ ...user, email: e.target.value }) }} type="text" placeholder="email" />
          <input onChange={(e: T_e) => { setL_User({ ...user, password: e.target.value }) }} type="password" placeholder="password" />
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              loginAction(e)
              
            }}
          >login</button>
          <p className="message">Not registered? <a href="/register">Create an account</a></p>
        </form>
      </div>
    </div>
  )
}
