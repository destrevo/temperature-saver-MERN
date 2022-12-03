import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Home(): JSX.Element {
  let bool = true
  if(bool) return <Navigate to="/login" />
  return (
    <div>Home</div>
  )
}
