import React, { useState, useContext } from 'react'
import { DataContext } from '../Context/Context'
import { Navigate } from 'react-router-dom';
import DataCreator from '../Components/DataCreator'
import TimePicker from '../Components/TimePicker'
import { Idate } from '../Interfaces/Interfaces'



export default function Customize(): JSX.Element {
  const { user } = useContext(DataContext)
  const [date, setDate] = useState<Idate>({
    year: 2022,
    month: 12,
    day: 1
  })
  if (!user) return <Navigate to="/login" />
  

  return (
    <div>
      <div>
        <TimePicker callback={(value: Idate) => { setDate(value) }} />
      </div>
      <div>
        <DataCreator currentDate={date} />
      </div>
    </div>
  )
}
