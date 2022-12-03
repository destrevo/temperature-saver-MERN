import React,{useContext} from 'react'
import Register from '../Components/Register'
import { Navigate } from 'react-router-dom'
import { DataContext } from '../Context/Context'

export default function RegisterPage(): JSX.Element {
  const { user } = useContext(DataContext)
  if (!!user) return <Navigate to="/customize" />
  return (
    <>
      <h1>Register</h1>
      <Register />
    </>
  )
}
