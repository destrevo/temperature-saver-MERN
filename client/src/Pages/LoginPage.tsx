import React,{useContext} from 'react'
import Login from '../Components/Login'
import { Navigate } from 'react-router-dom'
import { DataContext } from '../Context/Context'

export default function LoginPage(): JSX.Element {
  const { user } = useContext(DataContext)
    if (!!user) return <Navigate to="/customize" />
  return (
    <>
    <h1>Login</h1>
    <Login/>
    </>
  )
}
