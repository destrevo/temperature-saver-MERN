import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Graph from '../Components/Graph'
import { DataContext } from '../Context/Context'


export default function GraphPage(): JSX.Element {
    const { user } = useContext(DataContext)
    if (!user) return <Navigate to="/login" />

    return (
        <div>
            <Graph/>
        </div>
    )
}
